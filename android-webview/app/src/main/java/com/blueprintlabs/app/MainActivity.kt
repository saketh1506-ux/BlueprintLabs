package com.blueprintlabs.app

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.os.Bundle
import android.view.View
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.LinearLayout
import android.widget.ProgressBar
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var progressBar: ProgressBar
    private lateinit var errorLayout: LinearLayout
    private lateinit var btnRetry: Button

    // =========================================================================
    // CONFIGURATION: PUBLIC FIGMA PROTOTYPE URL
    // Replace with your public Figma prototype link if different.
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
        progressBar = findViewById(R.id.progressBar)
        errorLayout = findViewById(R.id.errorLayout)
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

        // Official Requirement: Enable JavaScript & DOM Storage
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true

        // Mobile responsiveness & viewport settings
        settings.loadWithOverviewMode = true
        settings.useWideViewPort = true
        settings.builtInZoomControls = false
        settings.displayZoomControls = false
        settings.setSupportZoom(false)

        // Cache & Performance
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        settings.databaseEnabled = true

        // Custom User Agent to ensure mobile Figma prototype view
        val defaultUserAgent = settings.userAgentString
        settings.userAgentString = "$defaultUserAgent BlueprintLabsMobileApp/1.0"

        webView.webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                super.onPageStarted(view, url, favicon)
                progressBar.visibility = View.VISIBLE
                errorLayout.visibility = View.GONE
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                progressBar.visibility = View.GONE
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                super.onReceivedError(view, request, error)
                // Show offline/retry layout only on main frame failure
                if (request?.isForMainFrame == true) {
                    progressBar.visibility = View.GONE
                    errorLayout.visibility = View.VISIBLE
                }
            }
        }
    }

    private fun loadPrototype() {
        progressBar.visibility = View.VISIBLE
        errorLayout.visibility = View.GONE
        webView.loadUrl(FIGMA_PROTOTYPE_URL)
    }

    private fun setupBackNavigation() {
        // Modern OnBackPressedCallback for Android 14 (API 34)
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
