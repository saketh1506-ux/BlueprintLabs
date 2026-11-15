package com.blueprintlabs.app

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.os.Bundle
import android.util.Log
import android.view.View
import android.webkit.CookieManager
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
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

        // 1. Official Requirements: Enable JavaScript & DOM Storage
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true

        // 2. Safe Cookie Management
        try {
            val cookieManager = CookieManager.getInstance()
            cookieManager.setAcceptCookie(true)
            cookieManager.setAcceptThirdPartyCookies(webView, true)
        } catch (e: Exception) {
            Log.w(tag, "CookieManager initialization warning", e)
        }

        // 3. Viewport and Mobile Scaling
        settings.loadWithOverviewMode = true
        settings.useWideViewPort = true
        settings.builtInZoomControls = false
        settings.displayZoomControls = false
        settings.setSupportZoom(false)

        // 4. Performance & Hardware Acceleration
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        settings.allowFileAccess = false
        settings.allowContentAccess = false

        // 5. User-Agent: Use default WebView UA to prevent any Android version mismatch
        // Using the default system User-Agent ensures maximum compatibility across all Android OS versions
        val defaultUA = settings.userAgentString
        Log.i(tag, "Default WebView UA: $defaultUA")

        // 6. WebChromeClient for page loading progress
        webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                super.onProgressChanged(view, newProgress)
                try {
                    if (newProgress in 1..99) {
                        loadingText.text = "Loading Prototype... $newProgress%"
                    } else if (newProgress == 100) {
                        loadingLayout.visibility = View.GONE
                    }
                } catch (e: Exception) {
                    Log.w(tag, "Progress update error", e)
                }
            }
        }

        // 7. WebViewClient with strict error and navigation handling
        webView.webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                super.onPageStarted(view, url, favicon)
                loadingLayout.visibility = View.VISIBLE
                errorLayout.visibility = View.GONE
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                loadingLayout.visibility = View.GONE
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                super.onReceivedError(view, request, error)
                if (request?.isForMainFrame == true) {
                    loadingLayout.visibility = View.GONE
                    errorLayout.visibility = View.VISIBLE
                    errorDescription.text = "Unable to load prototype (${error?.description ?: "Network error"}).\nPlease check your internet connection."
                }
            }

            override fun shouldOverrideUrlLoading(
                view: WebView?,
                request: WebResourceRequest?
            ): Boolean {
                return false
            }
        }
    }

    private fun loadPrototype() {
        loadingLayout.visibility = View.VISIBLE
        errorLayout.visibility = View.GONE
        loadingText.text = "Loading BlueprintLabs Prototype..."
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
        try {
            webView.destroy()
        } catch (e: Exception) {
            Log.w(tag, "WebView destroy warning", e)
        }
        super.onDestroy()
    }
}
