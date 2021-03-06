const { Schema, model } = require('mongoose'),
    UserSchema = Schema({
        name: { type: String, required: [true, 'El name es obligatorio'] },
        email: { type: String, required: [true, 'El email es obligatorio'], unique: true },
        password: { type: String, required: [true, 'El password es obligatorio'] },
        picture: { type: String },
        role: { type: String, required: [true, 'El rol es obligatorio'], default: 'NormalRol', emun: ['AdminRol', 'UserRole', 'NormalRol'] },
        condition: { type: Boolean, default: true },
        google: { type: String, default: false }
    });
UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}
module.exports = model('User', UserSchema);