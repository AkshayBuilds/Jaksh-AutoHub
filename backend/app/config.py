from fastapi_mail import ConnectionConfig
import os
from dotenv import load_dotenv

load_dotenv()

email_conf = ConnectionConfig(
    MAIL_USERNAME="amsp604@gmail.com",
    MAIL_PASSWORD="iwyrfxmnssfkagfq",
    MAIL_FROM="amsp604@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)