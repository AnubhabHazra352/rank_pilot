import mongoose from "mongoose";
import { useId } from "react";


const rankEnterySchema = new mongoose.Schema ({
    date: {
        type: Date,
        require: true,
    },

    position: {
        type: Number,
        default: null,
    },

    page: {
        type: Number,
        default: true
    },

    title: {
        type: String,
        default: ""
    },

    snippet: {
        type: String,
        default: ""
    }
}, {_id: false})

const comptitorSchema = new mongoose.Schema({
    position: {
        type: Number,
        required: true,
    },

    url: {
        type: String,
        required: true,
    },

    domain: {
        type: String,
        required: true,   
    },

    title: {
        type: String,
        default: ""
    },

    snippet: {
        type: String,
        default: ""
    }
}, {_id: false})

const keyWordTrackingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        keyword: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        url: {
            type: String,
            required: true,
            trim: true,
        },

        domain: {
            type: String,
            required: true,
            trim: true,
        },

        currentPosition:{
            type: Number,
            default: null,
        },

        currentPage: {
            type: Number,
            default: null,
        },

        bestPosition: {
            type: Number,
            default: null         
        },

        positionChange: {
            type: Number,
            default: 0
        },

        rankHistory: [rankEnterySchema],

        competitors: [comptitorSchema],

        active: {
            type: Boolean,
            default: true,
        },

        lastChecked: {
            type: Date,
            default: null,  
       },

       status: {
            type: String,
            enum: ["pending", "checking", "completed", "failed"],
            default: "pending",
       },
    },{timestamps: true}

)


keyWordTrackingSchema.index({useId: 1, keyword: 1, domain: 1}, {unique: true})

const KeywordTracking = mongoose.model("KeywordTracking", keyWordTrackingSchema)

export default KeywordTracking;