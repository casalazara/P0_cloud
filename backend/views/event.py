from models.event import Event
from schemas.event import events_schema, event_schema
from flask import request
from flask_restful import Resource
from models.model import db
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)
from datetime import datetime

class ResourceEvent(Resource):
    @jwt_required()
    def get(self):
        events = Event.query.filter_by(owner=get_jwt_identity()).order_by(Event.id.desc()).all()
        return events_schema.dump(events)
    
    @jwt_required()
    def post(self):
        new_event = Event(
            name = request.json["name"],
            category = request.json["category"],
            place = request.json["place"],
            address = request.json["address"],
            start_date = datetime.strptime(request.json["start_date"], "%Y-%m-%d"),
            end_date = datetime.strptime(request.json["end_date"], "%Y-%m-%d"),
            is_virtual = request.json["is_virtual"],
            owner= get_jwt_identity()
        )
        db.session.add(new_event)
        db.session.commit()
        return event_schema.dump(new_event)
     
class ResourceEventDetail(Resource):
    @jwt_required()
    def get(self, id_event):
        event = Event.query.filter_by(id = id_event, owner = get_jwt_identity()).first_or_404()
        return event_schema.dump(event)
    
    @jwt_required()
    def put(self, id_event):
        event = Event.query.filter_by(id = id_event, owner = get_jwt_identity()).first_or_404()
        event.name = request.json["name"]
        event.category = request.json["category"]
        event.place = request.json["place"]
        event.address = request.json["address"]
        event.start_date = datetime.strptime(request.json["start_date"], "%Y-%m-%d")
        event.end_date = datetime.strptime(request.json["end_date"], "%Y-%m-%d")
        event.is_virtual = request.json["is_virtual"]
        db.session.commit()
        return event_schema.dump(event)
    
    @jwt_required()
    def delete(self, id_event):
        event = Event.query.filter_by(id = id_event, owner = get_jwt_identity()).first_or_404()
        db.session.delete(event)
        db.session.commit()
        return "", 204