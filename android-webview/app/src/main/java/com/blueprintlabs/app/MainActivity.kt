package com.blueprintlabs.app

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.graphics.Color
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.View
import android.webkit.ConsoleMessage
import android.webkit.CookieManager
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

    // Fallback timeout to dismiss the loading overlay if Figma's SPA does not trigger 100% progress
    private val loadingTimeoutRunnable = Runnable {
        if (!isPageLoaded && loadingLayout.visibility == View.VISIBLE) {
            Log.w(tag, "Figma SPA background loading timed out: Revealing WebView")
            hideLoadingOverlay()
        }
    }

    companion object {
        const val FIGMA_PROTOTYPE_URL =
            "https://www.figma.com/proto/7KDm12r6ZNLuECGGWqu0Gr/UI-UX-Project---BlueprintLabs?node-id=0-1&scaling=scale-down&starting-point-node-id=0%3A1&mode=design"
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        try {
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

        // 1. Core Engine Requirements: JavaScript, DOM Storage & Database
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true

        // 2. Prevent Black Screen: Set WebView background to pure white
        webView.setBackgroundColor(Color.WHITE)

        // 3. Safe Cookie Management for cross-origin Figma resources
        try {
            val cookieManager = CookieManager.getInstance()
            cookieManager.setAcceptCookie(true)
            cookieManager.setAcceptThirdPartyCookies(webView, true)
        } catch (e: Exception) {
            Log.w(tag, "CookieManager initialization warning", e)
        }

        // 4. Viewport and Mobile Scaling
        settings.loadWithOverviewMode = true
        settings.useWideViewPort = true
        settings.builtInZoomControls = false
        settings.displayZoomControls = false
        settings.setSupportZoom(false)

        // 5. Hardware Acceleration enabled for Figma's WebGL canvas
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        settings.allowFileAccess = false
        settings.allowContentAccess = false

        // 6. WebChromeClient: Progress & Console logging
        webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                super.onProgressChanged(view, newProgress)
                Log.d(tag, "WebView loading progress: $newProgress%")
                if (newProgress in 1..99) {
                    loadingText.text = "Loading Prototype... $newProgress%"
                } else if (newProgress == 100) {
                    // Small delay to ensure WebGL/Canvas frame renders
                    Handler(Looper.getMainLooper()).postDelayed({
                        hideLoadingOverlay()
                    }, 500)
                }
            }

            override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                Log.d(tag, "Figma Console: [${consoleMessage?.messageLevel()}] ${consoleMessage?.message()}")
                return true
            }
        }

        // 7. WebViewClient: Page transitions & error handling
        webView.webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                super.onPageStarted(view, url, favicon)
                Log.i(tag, "onPageStarted: $url")
                isPageLoaded = false
                loadingLayout.visibility = View.VISIBLE
                errorLayout.visibility = View.GONE
                // Start a 10-second safety timeout
                timeoutHandler.removeCallbacks(loadingTimeoutRunnable)
                timeoutHandler.postDelayed(loadingTimeoutRunnable, 10000)
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                Log.i(tag, "onPageFinished: $url")
                // When page resources finish streaming, hide overlay
                Handler(Looper.getMainLooper()).postDelayed({
                    hideLoadingOverlay()
                }, 1000)
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

            override fun shouldOverrideUrlLoading(
                view: WebView?,
                request: WebResourceRequest?
            ): Boolean {
                // Keep all in-prototype navigations strictly inside WebView
                return false
            }
        }
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
