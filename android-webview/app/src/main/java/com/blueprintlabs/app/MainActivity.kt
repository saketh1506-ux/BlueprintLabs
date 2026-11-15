package com.blueprintlabs.app

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.net.http.SslError
import android.os.Bundle
import android.view.View
import android.webkit.CookieManager
import android.webkit.SslErrorHandler
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

    private lateinit var webView: WebView
    private lateinit var loadingLayout: LinearLayout
    private lateinit var progressBar: ProgressBar
    private lateinit var loadingText: TextView
    private lateinit var errorLayout: LinearLayout
    private lateinit var errorDescription: TextView
    private lateinit var btnRetry: Button

    // =========================================================================
    // CONFIGURATION: PUBLIC FIGMA PROTOTYPE URL
    // Loaded without device frame emulation so it fits the mobile screen natively.
    // =========================================================================
    companion object {
        const val FIGMA_PROTOTYPE_URL =
            "https://www.figma.com/proto/7KDm12r6ZNLuECGGWqu0Gr/UI-UX-Project---BlueprintLabs?node-id=0-1&scaling=scale-down&starting-point-node-id=0%3A1&mode=design"
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
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
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun configureWebView() {
        val settings: WebSettings = webView.settings

        // 1. Official Requirements: Enable JavaScript & DOM Storage
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true

        // 2. Cookie Management for Figma sessions & tokens
        val cookieManager = CookieManager.getInstance()
        cookieManager.setAcceptCookie(true)
        cookieManager.setAcceptThirdPartyCookies(webView, true)

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

        // 5. Standard Mobile Chrome User-Agent
        // Using a clean standard Chrome Android UA prevents Figma from denying custom embedded client agents
        settings.userAgentString =
            "Mozilla/5.0 (Linux; Android 14; Pixel 6 Build/AP1A.240405.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/124.0.6367.179 Mobile Safari/537.36"

        // 6. WebChromeClient for page loading progress
        webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                super.onProgressChanged(view, newProgress)
                if (newProgress in 1..99) {
                    loadingText.text = "Loading Prototype... $newProgress%"
                } else if (newProgress == 100) {
                    loadingLayout.visibility = View.GONE
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
                // Trigger native error layout only when the main frame fails to load
                if (request?.isForMainFrame == true) {
                    loadingLayout.visibility = View.GONE
                    errorLayout.visibility = View.VISIBLE
                    errorDescription.text = "Failed to load prototype (${error?.description ?: "Network error"}).\nPlease check your internet connection and try again."
                }
            }

            override fun shouldOverrideUrlLoading(
                view: WebView?,
                request: WebResourceRequest?
            ): Boolean {
                // Keep all in-prototype and Figma navigations inside the WebView
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
        // Android 14 (API 34) Back-Button handling
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
        webView.destroy()
        super.onDestroy()
    }
}
