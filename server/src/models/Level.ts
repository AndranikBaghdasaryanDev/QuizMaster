import { model, Schema } from "mongoose";

const levelSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
}, {
	timestamps: true
});

export const Level = model("Level", levelSchema);