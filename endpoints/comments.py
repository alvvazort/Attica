from silence.decorators import endpoint

@endpoint(
    route="/comments",
    method="GET",
    sql="SELECT * FROM categories"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/comments/$photoId",
    method="GET",
    sql="SELECT * FROM comments WHERE photoId = $photoId ORDER BY DATE"
)

def get_by_photoId():
    pass

###############################################################################

@endpoint(
    route="/comments",
    method="POST",
    sql="INSERT INTO comments (comment, userId, photoId) VALUES ($comment, $userId , $photoId)",
    description="Creates a new comment",
    auth_required=True,
)
def create(comment, userId, photoId):
    pass