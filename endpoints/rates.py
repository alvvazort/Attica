from silence.decorators import endpoint

@endpoint(
    route="/rates/$userId/$photoId",
    method="GET",
    sql="SELECT * FROM Rates WHERE userId = $userId && photoId = $photoId"
)
def get_valoraciones_by_id():
    pass

###############################################################################


@endpoint(
    route="/rates/$userId/$photoId",
    method="POST",
    sql="INSERT INTO Rates (userId,photoId) VALUES ($userId,$photoId)",
    description="Creates a new valoration",
    auth_required=False,
)
def create(userId,photoId):
    pass