from flask import Flask, render_template, request
import smtplib
from datetime import datetime
import os



app = Flask(__name__)

MYEMAIL = os.environ.get("YAHOOEMAIL")
PASSWORD = os.environ.get("YAHOOPASSWORD")
RECIPIENT = "vanessa.y.cui@gmail.com"


@app.route('/', methods=["GET","POST"])
def home():

    year = datetime.now().year
    if request.method == "POST":
        # in from JS will be recorded in JSON. Flask reads from JSON
        contactinfo = request.get_json()

        name = contactinfo["name"]
        email = contactinfo["email"]
        message = contactinfo["message"]

        with smtplib.SMTP("smtp.mail.yahoo.com", port=587) as connection:
            connection.starttls()
            connection.login(user=MYEMAIL, password=PASSWORD)
            connection.sendmail(
                from_addr=MYEMAIL,
                to_addrs=RECIPIENT,
                msg=f"Subject: New Message from Portfolio \n\n"
                    f"From: {name}\n"
                    f"Email: {email}\n"

                    f"Message:\n"
                    f"{message}"
            )

    return render_template("index.html", year=year)



if __name__ == '__main__':
    app.run(debug=True)
