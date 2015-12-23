
(function () {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app;

    // create an object to store the models for each view
    window.APP = {
      models: {
        home: {
          title: 'Home'
        },
        settings: {
          title: 'Settings'
        },
        contacts: {
          title: 'Contacts',
          ds: new kendo.data.DataSource({
            data: [{ id: 1, name: 'Bob' }, { id: 2, name: 'Mary' }, { id: 3, name: 'John' }]
          }),
          alert: function(e) {
            alert(e.data.name);
          }
        }
      }
    };

    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {  
      
      // hide the splash screen as soon as the app is ready. otherwise
      // Cordova will wait 5 very long seconds to do it for you.
      navigator.splashscreen.hide();

      app = new kendo.mobile.Application(document.body, {
        
        // comment out the following line to get a UI which matches the look
        // and feel of the operating system
        skin: 'nova',

        // the application needs to know which view to load first
        initial: 'views/home.html'
      });

    }, false);
    
    function onDeviceReady() {
     window.analytics.Start();
     // existing code goes here
	};

	function onPause() {
     window.analytics.Stop();
     // existing code goes here
	};
	function onResume() {
     window.analytics.Start();
     // existing code goes here
	};


}());


(function (g) {

	var productId = "41cdc9e2125244fb9bb2455355d54b10"; // App unique product key

	// Make analytics available via the window.analytics variable
	// Start analytics by calling window.analytics.Start()
	var analytics = g.analytics = g.analytics || {};
	analytics.Start = function () {
		// Handy shortcuts to the analytics api
		var factory = window.plugins.EqatecAnalytics.Factory;
		var monitor = window.plugins.EqatecAnalytics.Monitor;
		// Create the monitor instance using the unique product key for Analytics
		var settings = factory.CreateSettings(productId);
		settings.LoggingInterface = factory.CreateTraceLogger();
		factory.CreateMonitorWithSettings(settings,
			function () {
				console.log("Monitor created");
				// Start the monitor inside the success-callback
				monitor.Start(function () {
					console.log("Monitor started");
				});
			},
			function (msg) {
				console.log("Error creating monitor: " + msg);
			}
		);
	};
	analytics.Stop = function () {
		var monitor = window.plugins.EqatecAnalytics.Monitor;
		monitor.Stop();
	};
	analytics.Monitor = function () {
		return window.plugins.EqatecAnalytics.Monitor;
	};
})(window);

function onDeviceReady() {
	var app;
	app = new Application();
	app.run();
}

function Application() {
}

Application.prototype = {

	run: function() {
		var that = this,
			openLocal = document.getElementById("openLocal"),
			openExternalInAppBrowser = document.getElementById("openExternalInAppBrowser"),
			openExternalPDF = document.getElementById("openExternalPDF"),
			openExternalInSystemBrowser = document.getElementById("openExternalInSystemBrowser");

			openLocal.addEventListener("click", that.openLocal);
			openExternalInAppBrowser.addEventListener("click", that.openExternalInAppBrowser);
			openExternalPDF.addEventListener("click", that.openExternalPDF);
			openExternalInSystemBrowser.addEventListener("click", that.openExternalInSystemBrowser);
	},

	openLocal: function() {
		window.open("img/ice.png", "_blank");
	},
 
	openExternalInAppBrowser:  function () {
		window.open("http://icenium.com", "_blank");
	},

	openExternalPDF:  function () {
		if (window.navigator.simulator === true) {
			alert("Not Supported in Simulator.");
		} else {
			window.open("http://www.telerik.com/whitepapers/appbuilder/approaching-mobile-understanding-the-three-ways-to-build-mobile-apps", "_blank");
		}
	},

	openExternalInSystemBrowser:function () {
		window.open("http://wiki.apache.org/cordova/InAppBrowser", "_system");
	}
}
