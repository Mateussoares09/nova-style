from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class Product(BaseModel):
    id: str
    name: str
    price: float
    category: str
    description: str
    details: str
    image: str
    sizes: List[str]
    featured: bool = False
    tag: Optional[str] = None


class OrderItem(BaseModel):
    product_id: str
    name: str
    price: float
    size: str
    quantity: int


class OrderCreate(BaseModel):
    customer_name: str
    email: str
    phone: str
    address: str
    city: str
    items: List[OrderItem]
    total: float


class ContactCreate(BaseModel):
    name: str
    email: str
    message: str


class NewsletterCreate(BaseModel):
    email: str


SEED_PRODUCTS = [
    {
        "id": "casaco-aurora",
        "name": "Casaco Aurora",
        "price": 489,
        "category": "Casacos",
        "description": "Casaco oversized em pelo sintético premium, silhueta escultural e acabamento artesanal.",
        "details": "Composição: 70% modacrílico, 30% poliéster. Forro em cetim. Fecho invisível. Feito em edição limitada.",
        "image": "https://images.pexels.com/photos/28263000/pexels-photo-28263000.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "sizes": ["XS", "S", "M", "L"],
        "featured": True,
        "tag": "Nova Coleção",
    },
    {
        "id": "top-essence",
        "name": "Top Essence",
        "price": 129,
        "category": "Tops",
        "description": "Top estruturado em preto absoluto, corte minimalista com caimento impecável.",
        "details": "Composição: 95% algodão orgânico, 5% elastano. Costura francesa. Lavagem delicada a 30°.",
        "image": "https://images.unsplash.com/photo-1606143412458-acc5f86de897?auto=format&fit=crop&w=1400&q=80",
        "sizes": ["XS", "S", "M", "L", "XL"],
        "featured": True,
        "tag": None,
    },
    {
        "id": "fato-onyx",
        "name": "Fato Onyx",
        "price": 659,
        "category": "Alfaiataria",
        "description": "Fato de alfaiataria em lã fria italiana, linhas afiadas e presença arquitetónica.",
        "details": "Composição: 100% lã virgem italiana. Corte slim contemporâneo. Confeção em atelier europeu.",
        "image": "https://images.pexels.com/photos/5745783/pexels-photo-5745783.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "sizes": ["S", "M", "L", "XL"],
        "featured": True,
        "tag": "Best Seller",
    },
    {
        "id": "blazer-lumiere",
        "name": "Blazer Lumière",
        "price": 349,
        "category": "Alfaiataria",
        "description": "Blazer branco de ombros marcados, peça statement de estrutura impecável.",
        "details": "Composição: 68% viscose, 32% linho. Ombreiras estruturadas. Botões em madrepérola.",
        "image": "https://images.pexels.com/photos/9218520/pexels-photo-9218520.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "sizes": ["XS", "S", "M", "L"],
        "featured": True,
        "tag": None,
    },
    {
        "id": "parka-metropole",
        "name": "Parka Métropole",
        "price": 289,
        "category": "Casacos",
        "description": "Parka urbana de silhueta ampla, pensada para o ritmo da cidade moderna.",
        "details": "Composição: 100% algodão técnico impermeável. Bolsos funcionais. Capuz removível.",
        "image": "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1400&q=80",
        "sizes": ["S", "M", "L", "XL"],
        "featured": False,
        "tag": None,
    },
    {
        "id": "tshirt-studio",
        "name": "T-Shirt Studio",
        "price": 79,
        "category": "Tops",
        "description": "T-shirt essencial em algodão egípcio, o básico elevado ao seu estado mais puro.",
        "details": "Composição: 100% algodão egípcio penteado 220g. Corte relaxado. Gola reforçada.",
        "image": "https://images.unsplash.com/photo-1467043237213-65f2da53396f?auto=format&fit=crop&w=1400&q=80",
        "sizes": ["XS", "S", "M", "L", "XL"],
        "featured": False,
        "tag": None,
    },
    {
        "id": "conjunto-elan",
        "name": "Conjunto Élan",
        "price": 199,
        "category": "Acessórios",
        "description": "Calçado e brincos coordenados, o detalhe final de um look de passerelle.",
        "details": "Calçado em pele genuína. Brincos banhados a prata 925. Embalagem de oferta incluída.",
        "image": "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&w=1400&q=80",
        "sizes": ["36", "37", "38", "39", "40"],
        "featured": False,
        "tag": "Edição Limitada",
    },
    {
        "id": "camisa-noir",
        "name": "Camisa Seda Noir",
        "price": 159,
        "category": "Tops",
        "description": "Camisa fluida em seda negra, drapeado suave que acompanha cada movimento.",
        "details": "Composição: 100% seda mulberry 19 momme. Botões forrados. Limpeza a seco recomendada.",
        "image": "https://images.unsplash.com/photo-1637004732258-4b792ce8f474?auto=format&fit=crop&w=1400&q=80",
        "sizes": ["XS", "S", "M", "L"],
        "featured": False,
        "tag": None,
    },
    {
        "id": "vestido-drape",
        "name": "Vestido Drapé",
        "price": 319,
        "category": "Vestidos",
        "description": "Vestido drapeado em branco puro, inspirado na escultura clássica europeia.",
        "details": "Composição: 92% crepe de viscose, 8% elastano. Drapeado assimétrico. Forro integral.",
        "image": "https://images.pexels.com/photos/8465947/pexels-photo-8465947.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "sizes": ["XS", "S", "M", "L"],
        "featured": False,
        "tag": "Nova Coleção",
    },
]


@app.on_event("startup")
async def seed_products():
    count = await db.products.count_documents({})
    if count == 0:
        await db.products.insert_many([dict(p) for p in SEED_PRODUCTS])


@api_router.get("/")
async def root():
    return {"message": "NOVA STYLE API"}


@api_router.get("/products", response_model=List[Product])
async def get_products(category: Optional[str] = None, featured: Optional[bool] = None):
    query = {}
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    docs = await db.products.find(query, {"_id": 0}).to_list(100)
    return docs


@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    doc = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return doc


@api_router.get("/categories")
async def get_categories():
    cats = await db.products.distinct("category")
    return {"categories": sorted(cats)}


@api_router.post("/orders")
async def create_order(order: OrderCreate):
    doc = order.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["status"] = "pendente"
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.orders.insert_one(dict(doc))
    return {"id": doc["id"], "status": "pendente", "message": "Encomenda recebida com sucesso"}


@api_router.post("/contact")
async def create_contact(contact: ContactCreate):
    doc = contact.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.contacts.insert_one(dict(doc))
    return {"id": doc["id"], "message": "Mensagem enviada com sucesso"}


@api_router.post("/newsletter")
async def subscribe_newsletter(sub: NewsletterCreate):
    existing = await db.newsletter.find_one({"email": sub.email})
    if existing:
        return {"message": "Email já subscrito"}
    await db.newsletter.insert_one({"id": str(uuid.uuid4()), "email": sub.email, "created_at": datetime.now(timezone.utc).isoformat()})
    return {"message": "Subscrição confirmada"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
