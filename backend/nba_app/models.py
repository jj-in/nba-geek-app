from . import db, bcrypt

class PlayerBio(db.Model):
    __tablename__ = 'player_bio'

    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, index=True, unique=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    display_name = db.Column(db.String)
    birthdate = db.Column(db.Date)
    school = db.Column(db.String)
    height = db.Column(db.String)
    weight = db.Column(db.String)
    jersey = db.Column(db.String)
    position = db.Column(db.String)
    team_id = db.Column(db.Integer)
    team_abbreviation = db.Column(db.String)
    from_year = db.Column(db.Integer)
    to_year = db.Column(db.Integer)
    draft_year = db.Column(db.String)
    draft_round = db.Column(db.String)
    draft_number = db.Column(db.String)

    def to_dict(self):
        return {
            "player_id": self.player_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "display_name": self.display_name,
            "birthdate": self.birthdate.isoformat() if self.birthdate else None,
            "school": self.school,
            "height": self.height,
            "weight": self.weight,
            "jersey": self.jersey,
            "position": self.position,
            "team_id": self.team_id,
            "team_abbreviation": self.team_abbreviation,
            "from_year": self.from_year,
            "to_year": self.to_year,
            "draft_year": self.draft_year,
            "draft_round": self.draft_round,
            "draft_number": self.draft_number
        }

class SynergyData(db.Model):
    __tablename__ = 'synergy_data'
    
    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer)
    player_name = db.Column(db.String)
    season_id = db.Column(db.String)
    team_id = db.Column(db.Integer)
    team_abbreviation = db.Column(db.String)
    play_type = db.Column(db.String)
    gp = db.Column(db.Integer)
    ppp = db.Column(db.Float)
    poss = db.Column(db.Integer)
    pts = db.Column(db.Integer)
    fg_pct = db.Column(db.Float)
    efg_pct = db.Column(db.Float)
    frequency = db.Column(db.Float)
    score_frequency = db.Column(db.Float)
    percentile = db.Column(db.Float)

    def to_dict(self):
        return {
            "player_id": self.player_id,
            "player_name": self.player_name,
            "season_id": self.season_id,
            "team_id": self.team_id,
            "team_abbreviation": self.team_abbreviation,
            "play_type": self.play_type,
            "gp": self.gp,
            "ppp": self.ppp,
            "poss": self.poss,
            "pts": self.pts,
            "fg_pct": self.fg_pct,
            "efg_pct": self.efg_pct,
            "frequency": self.frequency,
            "score_frequency": self.score_frequency,
            "percentile": self.percentile
        }

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    favorite_players = db.relationship('FavoritePlayers', backref='user', lazy=True)

    def __repr__(self):
        return f"<User ID: {self.id}. Account owner: {self.email}>"

    def set_password(self, password):
        """Hash the password and store its hash."""
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        """Check if the provided password matches the stored hash."""
        return bcrypt.check_password_hash(self.password_hash, password)

    @classmethod
    def signup(cls, username, email, password):
        """Create a new user, hash their password, and add them to the database."""
        user = cls(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return user

    @classmethod
    def authenticate(cls, username, password):
        """Verify that the user exists and their password is correct."""
        user = cls.query.filter_by(username=username).first()
        if user and user.check_password(password):
            return user
        return False
    
class FavoritePlayers(db.Model):

    __tablename__ = 'favorite_players'

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False,
    )

    player_id = db.Column(
        db.Text,
        nullable=False,
    )

    def __repr__(self):
        return f"<List id: {self.id}, user id: {self.user_id}>"


