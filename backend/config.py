from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath()
load_dotenv(path.join(basedir, '.env'))

class Config:
    """Set Flask configuration from .env file."""

    # General Config
    SECRET_KEY = environ.get('SECRET_KEY')
    JWT_SECRET_KEY = environ.get('JWT_SECRET_KEY')

    # Database
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URI")
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
