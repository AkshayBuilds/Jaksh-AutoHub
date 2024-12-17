from fastapi_mail import ConnectionConfig
import os
from dotenv import load_dotenv
from functools import lru_cache

load_dotenv()

# Cache configuration to avoid repeated env loading
@lru_cache()
def get_email_config():
    return ConnectionConfig(
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

email_conf = get_email_config()

# Add rate limiting configuration
RATE_LIMIT_PER_MINUTE = 60