from app import db 
from enum import Enum

class EventCategory(str, Enum):
    conference = "conference"
    seminar = "seminar"
    congress = "congress"
    course = "course"


class Event(db.Model):
    __tablename__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    category = db.Column(db.Enum(EventCategory), nullable=False)
    place = db.Column(db.String(128), nullable=False)
    address = db.Column(db.String(128), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    is_virtual = db.Column(db.Boolean, nullable=False)
    owner = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
