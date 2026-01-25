import express from "express";
import { urlModel } from "../model/shortUrl.ts";


export const createUrl = async(req:express.Request,res:express.Response)=> {
    try {
        console.log("The fullUrl is: ", req.body.fullUrl);
        const {fullUrl} = req.body;
        const urlFound = await urlModel.find({fullUrl});
        if(urlFound.length > 0) {
            //409 is the status code for conflict, already exist url
            res.status(409).send(urlFound);
    } else {
            const shortUrl = await urlModel.create({fullUrl});
            res.status(201).send(shortUrl); //201 is the status code for created
    }
        
    } catch (error) {
        res.status(500).send({"message": "something went wrong"})//500 for server error
    }
    
};

export const getAllUrl = async(req:express.Request,res:express.Response)=> {
    try {
        const shortUrls = await urlModel.find();
        if(shortUrls.length < 0) {
            res.status(404).send({"message": "short Urls not found"});
        } else {
            res.status(200).send(shortUrls);
        }
    } catch (error) {
        res.status(500).send({"message": "something went wrong"})
    }
};

export const getUrl = async(req:express.Request,res:express.Response)=> {
    try {
        //const id = typeof req.params.id === 'string' ? req.params.id : undefined;
        const{id} = req.params;
        if (!id) {
            res.status(400).send({"message": "Invalid short URL parameter"});
            return;
        }
        const shortUrl = await urlModel.findOne({shortUrl: id});
        if(!shortUrl) {
            res.status(404).send({"message": "Short URL not found"});
        } else {
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`);
        }
    } catch (error) {
        res.status(500).send({"message": "something went wrong"});
    }
    
};

export const deleteUrl = async(req:express.Request,res:express.Response)=> {
    try {
        const shortUrl = await urlModel.findByIdAndDelete({_id: req.params.id})
        if(shortUrl) {
            res.status(200).send({"message": "Requsted URL successfully deleted."})
        }
    } catch (error) {
        res.status(500).send({"message": "Something went wrong"})
    }
};


