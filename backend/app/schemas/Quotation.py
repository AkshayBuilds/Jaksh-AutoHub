from pydantic import BaseModel, EmailStr
from enum import Enum

class PaymentType(str, Enum):
    cash = "cash"
    loan = "loan"

class QuotationForm(BaseModel):
    name: str
    phone: str
    email: EmailStr
    brand: str
    model: str
    payment_type: PaymentType
    down_payment: float
    tenure: int
    old_vehicle_details: str
    exchange_vehicle: str
