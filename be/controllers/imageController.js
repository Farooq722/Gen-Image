const userModel = require("../model/userData");
const formData = require("form-data");
const axios = require("axios");

const generateImage = async(req, res) => {
    try {
        const { userId, prompt } = req.body;

        const user = await userModel.findById(userId);
        if(!user || !prompt) {
            return res.status(400).json({
                msg: "Missing details"
            });
        }

        if(user.creditBalance <= 0) {
            return res.json({
                msg: "No credit balance",
                creditBalance: user.creditBalance
            });
        }
        
        const formData1 = new formData();
        formData1.append('prompt',prompt)

        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData1, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
              },
              responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        await userModel.findByIdAndUpdate(user._id, {
            creditBalance: user.creditBalance - 1
        });

        return res.status(200).json({
            msg: "Image generated successfully",
            success: true,
            creditBalance: user.creditBalance - 1,
            resultImage
        });


    } catch (error) {
        return res.status(500).json({
            msg: error.message || error
        })
    }
}

module.exports = { 
    generateImage
}