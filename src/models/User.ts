import { Schema, Document, model, Types } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],

        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
          },
          id: false,
    }
);


userSchema.virtual('friendCount').get(function (this: IUser) {
    return this.friends.length;
});

const User = model('User', userSchema);
export default User;



