from silence.decorators import endpoint

@endpoint(
    route="/photos",
    method="GET",
    sql="SELECT * FROM Photos WHERE visibility = 'Public' ORDER BY DATE DESC "
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/photos/user/$userId",
    method="GET",
    sql="SELECT * FROM Photos WHERE (userId != $userId && visibility = 'Public') || (userId = $userId) ORDER BY date DESC"
)
def get_all_reverse():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="GET",
    sql="SELECT * FROM Photos WHERE photoId = $photoId "
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/photos/categories/$categoryId",
    method="GET",
    sql="SELECT * FROM Photos WHERE categoryId = $categoryId && visibility = 'Public'"
)
def get_by_category():
    pass

###############################################################################

@endpoint(
    route="/photos",
    method="POST",
    sql="INSERT INTO Photos (title, description, url, visibility, userId, categoryId) VALUES ($title, $description, $url, $visibility, $userId, $categoryId)",
    description="Creates a new photo",
    auth_required=True,
)
def create(title, description, url, visibility, userId, categoryId):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="PUT",
    sql="UPDATE Photos SET title = $title, description = $description, url = $url, visibility = $visibility, rate = $rate , numRaters = $numRaters, categoryId = $categoryId WHERE photoId = $photoId",
    description="Updates an existing photo",
    auth_required=True,
)
def update(title, description, url, visibility, rate, numRaters, categoryId):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="DELETE",
    sql="DELETE FROM Photos WHERE photoId = $photoId",
    description="Removes a photo",
    auth_required=True,
)
def delete():
    pass
