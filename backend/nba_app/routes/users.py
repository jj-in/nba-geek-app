from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
from ..models import User, FavoritePlayers, db

users_blueprint = Blueprint('users_blueprint', __name__)

@users_blueprint.route('/users/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    try:
        user = User.signup(username, email, password) 
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify(message="Username already taken"), 400

@users_blueprint.route('/users/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    try:
        user = User.authenticate(username, password)
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    
    except Exception as e:
        return jsonify(message="Invalid credentials"), 401
    
@users_blueprint.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    try:
        current_user = get_jwt_identity()
        return jsonify(verified=current_user), 200
    except Exception as e:
        return jsonify(message="Token expired or invalid"), 401
    
# Handle user logout
@users_blueprint.route('/users/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify(message="Logged out successfully"), 200

# View user profile
@users_blueprint.route('/users/profile/<username>')
@jwt_required()
def show_userprofile(username):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=username).first_or_404()
    favorites = [player.player_id for player in user.favorite_players]
    response = {
        "username": user.username,
        "email": user.email,
        "favorites": favorites
    }
    return jsonify(response), 200

# Add a favorite player
@users_blueprint.route('/users/favorites/add/<player_id>', methods=["POST"])
@jwt_required()
def add_favorite(player_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    new_favorite = FavoritePlayers(user_id=user.id, player_id=player_id)
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify(message="Added to favorites"), 200

# Delete a favorite player
@users_blueprint.route('/users/favorites/delete/<player_id>', methods=["POST"])
@jwt_required()
def delete_favorite(player_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    favorite = FavoritePlayers.query.filter_by(user_id=user.id, player_id=player_id).first()

    if not favorite:
        return jsonify(message="Favorite not found"), 404

    db.session.delete(favorite)
    db.session.commit()
    return jsonify(message="Deleted from favorites"), 200

# Delete user account
@users_blueprint.route('/users/account/delete', methods=["POST"])
@jwt_required()
def delete_account():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user:
        return jsonify(message="User not found"), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify(message="Account deleted"), 200

