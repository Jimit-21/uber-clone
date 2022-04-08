import mongoose from "mongoose";

// to create one
export const create = async(model, data) => {
    try {
        const dat = await model.create(data);
        // console.log(dat);
        if (!dat) {
            return false;
        }
        return dat;
    } catch (error) {
        // console.log(error);
        return false;
    }
  };
  
// to find one
export const findOne = async(model, data) => {
    try {
        // console.log(data, "abcd");
        const dat = await model.findOne(data);
        console.log(dat);
        if (!dat) {
            return false;
        }
        return dat;
    } catch (error) {
        return false;
    }
};

// to delete
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

// to find many
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