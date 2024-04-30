import datetime
import logging
import uuid

from flask import Flask, render_template, request, jsonify
from gunicorn.app.base import BaseApplication

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

@app.route("/resources_education")
def resources_education_route():
    return render_template("resources_education.html")


@app.route("/")
def home_route():
    return render_template("home.html")


@app.route("/about")
def about_route():
    return render_template("about.html")


@app.route("/services")
def services_route():
    return render_template("services.html")


@app.route("/contact")
def contact_route():
    return render_template("contact.html")


@app.route("/pricing")
def pricing_route():
    return render_template("pricing.html")


# Removed routes for 'name', 'email', 'phone', and 'message' as they were incorrectly identified as routes
# These were actually form field retrievals in the '/submit-contact-form' POST request handler
@app.route("/submit-contact-form", methods=["POST"])
def submit_contact_form():
    # Logic to handle the submitted form data, such as storing it in a database or sending an email.
    # Placeholder for form processing logic
    return jsonify({"success": True, "msg": "Form submitted successfully!"})
class StandaloneApplication(BaseApplication):
    def __init__(self, app, options=None):
        self.application = app
        self.options = options or {}
        super().__init__()

    def load_config(self):
        config = {
            key: value
            for key, value in self.options.items()
            if key in self.cfg.settings and value is not None
        }
        for key, value in config.items():
            self.cfg.set(key.lower(), value)

    def load(self):
        return self.application


# Do not remove the main function while updating the app.
if __name__ == "__main__":
    options = {"bind": "%s:%s" % ("0.0.0.0", "8080"), "workers": 4, "loglevel": "info", "accesslog": "-"}
    StandaloneApplication(app, options).run()