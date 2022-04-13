import mongoose from "mongoose";

export const create = async(model, data) => {
    try {
        const dat = await model.create(data);
        if (!dat) {
            return false;
        }
        return dat;
    } catch (error) {
        return false;
    }
  };

export const findOne = async(model, data) => {
    try {
        const dat = await model.findOne(data);
        if (!dat) {
            return false;
        }
        return dat;
    } catch (error) {
        return false;
    }
};

export const deleteOne = async (model, data) => {
    try {
        const  dat = await model.findOneAndDelete(data);
        if (!dat) {
            return false;
        }
        return dat;
    } catch (error) {
        return false;
    }
};

export const find = async(model, data) => {
    try {
        const dat = await model.find(data);
        if (!dat) {
            return false;
        }
        return dat;
    } catch (error) {
        return false;
    }
};