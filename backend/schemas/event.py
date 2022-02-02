from app import ma

class EventSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "name",
            "category",
            "place",
            "address",
            "start_date",
            "end_date",
            "is_virtual",
            "owner",
        )
event_schema = EventSchema()
events_schema = EventSchema(many=True)