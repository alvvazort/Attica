from silence.decorators import endpoint

@endpoint(
    route="/users/$userId",
    method="GET",
    sql="SELECT * FROM Users WHERE userId = $userId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/user/$username",
    method="GET",
    sql="SELECT * FROM Users WHERE username = $username"
)
def get_by_username():
    pass

###############################################################################

@endpoint(
    route="/users/photos/$userId",
    method="GET",
    sql="SELECT * FROM photos WHERE userId = $userId && visibility = 'Public' ORDER BY date DESC"
)
def get_all_reverse_by_userId():
    pass

###############################################################################

@endpoint(
    route="/user/photos/$userId",
    method="GET",
    sql="SELECT * FROM photos WHERE userId = $userId ORDER BY DATE DESC"
)
def get_all_private_by_userId():
    pass

###############################################################################

@endpoint(
    route="/users/$userId",
    method="PUT",
    sql="UPDATE Users SET avatarUrl = $avatarUrl, firstName = $firstName, lastName = $lastName, email = $email, description = $description WHERE userId = $userId",
    description="Updates an existing user",
    auth_required=True
)
def update(avatarUrl, firstName, lastName, email, description):
    pass
