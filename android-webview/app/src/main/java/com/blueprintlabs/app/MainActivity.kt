package com.blueprintlabs.app

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.View
import android.webkit.ConsoleMessage
import android.webkit.CookieManager
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.TextView
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private val tag = "BlueprintLabsMain"

    private lateinit var webView: WebView
    private lateinit var loadingLayout: LinearLayout
    private lateinit var progressBar: ProgressBar
    private lateinit var loadingText: TextView
    private lateinit var errorLayout: LinearLayout
    private lateinit var errorDescription: TextView
    private lateinit var btnRetry: Button

    private val timeoutHandler = Handler(Looper.getMainLooper())
    private var isPageLoaded = false

    // Safety timeout to dismiss loading screen once WebGL begins painting
    private val loadingTimeoutRunnable = Runnable {
        if (!isPageLoaded && loadingLayout.visibility == View.VISIBLE) {
            Log.w(tag, "Prototype canvas initialization timeout: Revealing WebView")
            hideLoadingOverlay()
        }
    }

    companion object {
        // Official Figma Prototype URL enriched with parameters for seamless native WebView embedding:
        // - device-frame=0: removes outer desktop phone mockup wrapper so content fits the physical screen edge-to-edge
        // - hide-ui=1: hides Figma top/bottom web presentation toolbars
        // - hotspot-hints=0: disables flashing blue debug rectangles
        // - scaling=contain: ensures all 9 prototype screens scale proportionally to the phone viewport
        const val FIGMA_PROTOTYPE_URL =
            "https://www.figma.com/proto/7KDm12r6ZNLuECGGWqu0Gr/UI-UX-Project---BlueprintLabs?node-id=0-1&scaling=contain&starting-point-node-id=0%3A1&mode=design&device-frame=0&hide-ui=1&hotspot-hints=0"
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        try {
            // Enable Chrome DevTools remote inspection for live USB debugging via chrome://inspect
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                WebView.setWebContentsDebuggingEnabled(true)
            }

            setContentView(R.layout.activity_main)

            webView = findViewById(R.id.webview)
            loadingLayout = findViewById(R.id.loadingLayout)
            progressBar = findViewById(R.id.progressBar)
            loadingText = findViewById(R.id.loadingText)
            errorLayout = findViewById(R.id.errorLayout)
            errorDescription = findViewById(R.id.errorDescription)
            btnRetry = findViewById(R.id.btnRetry)

            configureWebView()
            setupBackNavigation()

            btnRetry.setOnClickListener {
                loadPrototype()
            }

            loadPrototype()
        } catch (t: Throwable) {
            Log.e(tag, "Fatal initialization error in onCreate", t)
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun configureWebView() {
        val settings: WebSettings = webView.settings

        // 1. Core JavaScript, Storage & Database Engines
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        settings.loadsImagesAutomatically = true

        // 2. Prevent Black Screen: Solid white background and hardware acceleration
        webView.setBackgroundColor(Color.WHITE)
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)

        // 3. Prevent black screen caused by Android Algorithmic Darkening / forced dark inversion
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            settings.isAlgorithmicDarkeningAllowed = false
        }

        // 4. Media & file capabilities
        settings.mediaPlaybackRequiresUserGesture = false
        settings.allowFileAccess = false
        settings.allowContentAccess = false
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        }

        // 5. Cross-Origin Cookie Persistence for Figma
        try {
            val cookieManager = CookieManager.getInstance()
            cookieManager.setAcceptCookie(true)
            cookieManager.setAcceptThirdPartyCookies(webView, true)
            // Pre-seed consent cookie on figma.com to suppress blocking modal
            cookieManager.setCookie("https://www.figma.com", "cookie_consent=true; Domain=.figma.com; Path=/; Secure; SameSite=None")
            cookieManager.flush()
        } catch (e: Exception) {
            Log.w(tag, "CookieManager setup warning", e)
        }

        // 6. Viewport and Scaling
        settings.loadWithOverviewMode = true
        settings.useWideViewPort = true
        settings.builtInZoomControls = false
        settings.displayZoomControls = false
        settings.setSupportZoom(false)
        settings.cacheMode = WebSettings.LOAD_DEFAULT

        // 7. WebChromeClient: Detailed progress and console logging
        webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                super.onProgressChanged(view, newProgress)
                Log.d(tag, "WebView progress: $newProgress%")
                if (newProgress in 1..99) {
                    loadingText.text = "Loading Prototype... $newProgress%"
                } else if (newProgress == 100) {
                    // Inject JS to auto-dismiss consent banner and override black canvas wrapper
                    dismissConsentAndReveal()
                    Handler(Looper.getMainLooper()).postDelayed({
                        hideLoadingOverlay()
                    }, 500)
                }
            }

            override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                Log.d(tag, "Figma Console: [${consoleMessage?.messageLevel()}] ${consoleMessage?.message()} (${consoleMessage?.sourceId()}:${consoleMessage?.lineNumber()})")
                return true
            }
        }

        // 8. WebViewClient: Comprehensive lifecycle, error diagnosis, and script injection
        webView.webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                super.onPageStarted(view, url, favicon)
                Log.i(tag, "onPageStarted: $url")
                isPageLoaded = false
                loadingLayout.visibility = View.VISIBLE
                errorLayout.visibility = View.GONE
                timeoutHandler.removeCallbacks(loadingTimeoutRunnable)
                timeoutHandler.postDelayed(loadingTimeoutRunnable, 10000)
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                Log.i(tag, "onPageFinished: $url")
                // Flush cookies to disk so dismissal survives across app restarts
                try {
                    CookieManager.getInstance().flush()
                } catch (ignored: Exception) {}

                // Execute automated consent dismissal and layout fix
                dismissConsentAndReveal()

                Handler(Looper.getMainLooper()).postDelayed({
                    hideLoadingOverlay()
                }, 800)
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                super.onReceivedError(view, request, error)
                Log.e(tag, "onReceivedError: ${error?.errorCode} - ${error?.description} for ${request?.url}")
                if (request?.isForMainFrame == true) {
                    timeoutHandler.removeCallbacks(loadingTimeoutRunnable)
                    loadingLayout.visibility = View.GONE
                    errorLayout.visibility = View.VISIBLE
                    errorDescription.text = "Unable to load prototype (${error?.description ?: "Network error"}).\nPlease check your internet connection."
                }
            }

            override fun onReceivedHttpError(
                view: WebView?,
                request: WebResourceRequest?,
                errorResponse: WebResourceResponse?
            ) {
                super.onReceivedHttpError(view, request, errorResponse)
                Log.w(tag, "onReceivedHttpError: ${errorResponse?.statusCode} for ${request?.url}")
            }

            override fun onRenderProcessGone(
                view: WebView?,
                detail: android.webkit.RenderProcessGoneDetail?
            ): Boolean {
                val didCrash = detail?.didCrash() ?: false
                Log.e(tag, "onRenderProcessGone: Renderer crashed=$didCrash. Reloading WebView.")
                try {
                    loadPrototype()
                } catch (e: Exception) {
                    Log.e(tag, "Error reloading after render process gone", e)
                }
                return true
            }

            override fun shouldOverrideUrlLoading(
                view: WebView?,
                request: WebResourceRequest?
            ): Boolean {
                // Keep all in-prototype navigations strictly inside the WebView
                return false
            }
        }
    }

    /**
     * Injects JavaScript into Figma's page context to:
     * 1. Automatically click "Allow all cookies" or hide the consent banner if present.
     * 2. Ensure body and html background styling does not force pitch-black over the WebGL canvas.
     */
    private fun dismissConsentAndReveal() {
        val jsScript = """
            (function() {
                try {
                    // 1. Look for cookie consent buttons and trigger click
                    var buttons = document.querySelectorAll('button');
                    for (var i = 0; i < buttons.length; i++) {
                        var text = (buttons[i].innerText || buttons[i].textContent || '').toLowerCase();
                        if (text.indexOf('allow all') !== -1 || text.indexOf('accept') !== -1 || text.indexOf('dismiss') !== -1) {
                            buttons[i].click();
                            break;
                        }
                    }
                    // 2. Hide any lingering consent banners
                    var banners = document.querySelectorAll('[role="region"][aria-label*="Consent"], [class*="cookie_banner"], [class*="base_cookie_banner"]');
                    for (var j = 0; j < banners.length; j++) {
                        banners[j].style.display = 'none';
                    }
                    // 3. Ensure body has overflow visible for touch gestures
                    if (document.body) {
                        document.body.style.backgroundColor = '#FFFFFF';
                    }
                } catch (e) {
                    console.error('Consent auto-dismiss error:', e);
                }
            })();
        """.trimIndent()

        webView.evaluateJavascript(jsScript, ValueCallback { result ->
            Log.d(tag, "dismissConsentAndReveal evaluation result: $result")
        })
    }

    private fun hideLoadingOverlay() {
        isPageLoaded = true
        timeoutHandler.removeCallbacks(loadingTimeoutRunnable)
        loadingLayout.visibility = View.GONE
        webView.visibility = View.VISIBLE
    }

    private fun loadPrototype() {
        isPageLoaded = false
        loadingLayout.visibility = View.VISIBLE
        errorLayout.visibility = View.GONE
        loadingText.text = "Loading BlueprintLabs Prototype..."
        timeoutHandler.removeCallbacks(loadingTimeoutRunnable)
        timeoutHandler.postDelayed(loadingTimeoutRunnable, 10000)
        webView.loadUrl(FIGMA_PROTOTYPE_URL)
    }

    private fun setupBackNavigation() {
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
    }

    override fun onPause() {
        super.onPause()
        webView.onPause()
    }

    override fun onDestroy() {
        timeoutHandler.removeCallbacks(loadingTimeoutRunnable)
        try {
            webView.destroy()
        } catch (e: Exception) {
            Log.w(tag, "WebView destroy warning", e)
        }
        super.onDestroy()
    }
}
