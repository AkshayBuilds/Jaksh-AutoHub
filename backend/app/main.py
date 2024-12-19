from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi_mail import FastMail, MessageSchema, MessageType
from pydantic import BaseModel, EmailStr
from mangum import Mangum
import os
from dotenv import load_dotenv
from fastapi_mail import ConnectionConfig

# Move these classes to separate files if you want
class ContactForm(BaseModel):
    name: str
    phone: str
    email: EmailStr
    message: str

class QuotationForm(BaseModel):
    name: str
    phone: str
    email: EmailStr
    brand: str
    model: str
    payment_type: str
    down_payment: float
    tenure: int
    old_vehicle_details: str
    exchange_vehicle: str

# Remove the relative imports
load_dotenv()

# Move email config here
email_conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

app = FastAPI()
handler = Mangum(app)

# Configure CORS - Fix the trailing slash in URLs
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://sidhhivinayak.vercel.app",
        "https://sidhhivinayak.netlify.app",  # Remove trailing slash
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Siddhivinayak Backend"}

@app.get("/hello")
def read_root():
    return {"message": "hello from akshay"}

@app.post("/contact")
async def send_contact_email(contact: ContactForm):
    try:
        # Email to admin (you)
        admin_message = MessageSchema(
            subject=f"New Contact Form Submission from {contact.name}",
            recipients=["amsp604@gmail.com"],  # Your email address
            body=f"""
            New contact form submission:
            
            Name: {contact.name}
            Email: {contact.email}
            Phone: {contact.phone}
            Message: {contact.message}
            """,
            subtype=MessageType.plain
        )

        # Auto-reply to user
        user_message = MessageSchema(
            subject="Thank you for contacting Siddhivinayak Auto World",
            recipients=[contact.email],  # User's email from the form
            body=f"""
            Dear {contact.name},

            Thank you for contacting Siddhivinayak Auto 
            World. We have received your message and will 
            get back to you as soon as possible.

            Your message:
            {contact.message}

            Best regards,
            Siddhivinayak Auto World Team
            """,
            subtype=MessageType.plain
        )

        fm = FastMail(email_conf)
        # Send both emails
        await fm.send_message(admin_message)
        await fm.send_message(user_message)

        return {"status": "success", "message": "Email sent successfully"}
    except Exception as e:
        print(f"Error sending email: {str(e)}")  # For debugging
        raise HTTPException(status_code=500, detail=str(e))
 
 
@app.post("/quotation")
async def submit_quotation(quotation: QuotationForm):
    try:
        # Email to admin
        admin_message = MessageSchema(
            subject=f"New Quotation Request from {quotation.name}",
            recipients=["amsp604@gmail.com"],
            body=f"""
            New quotation request:
            
            Name: {quotation.name}
            Email: {quotation.email}
            Phone: {quotation.phone}
            Brand: {quotation.brand}
            Model: {quotation.model}
            Payment Type: {quotation.payment_type}
            Down Payment: {quotation.down_payment}
            Tenure: {quotation.tenure}
            Exchange Vehicle: {quotation.exchange_vehicle}
            Old Vehicle Details: {quotation.old_vehicle_details}
            """,
            subtype=MessageType.plain
        )

        # Auto-reply to user
        user_message = MessageSchema(
            subject="Thank you for your quotation request",
            recipients=[quotation.email],
            body=f"""
            Dear {quotation.name},

            Thank you for requesting a quotation from 
            Siddhivinayak Auto World. 
            
            We have received your request and will get back to 
            you shortly with detailed pricing information.

            Your request details:
            Brand: {quotation.brand}
            Model: {quotation.model}
            Payment Type: {quotation.payment_type}

            Best regards,
            Siddhivinayak Auto World Team
            """,
            subtype=MessageType.plain
        )

        fm = FastMail(email_conf)
        await fm.send_message(admin_message)
        await fm.send_message(user_message)

        return {"status": "success", "message": "Quotation request sent successfully"}
    except Exception as e:
        print(f"Error processing quotation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))