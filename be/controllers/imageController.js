const userModel = require("../model/userData");
const formData = require("form-data");
const axios = require("axios");

const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        if (!userId || !prompt) {
            return res.status(400).json({
                msg: "Missing details",
                success: false,
                error: true
            });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                msg: "User not found",
                success: false,
                error: true
            });
        }

        if (user.creditBalance <= 0) {
            return res.status(403).json({
                msg: "No credit balance",
                creditBalance: user.creditBalance,
                success: false,
                error: true
            });
        }

        // Prepare request to ClipDrop API
        const formData1 = new formData();
        formData1.append("prompt", prompt);

        let base64Image;
        try {
            const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData1, {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API
                },
                responseType: "arraybuffer"
            });

            base64Image = Buffer.from(data, "binary").toString("base64");
        } catch (apiError) {
            console.error("Error with ClipDrop API:", apiError.response?.data || apiError.message);
            return res.status(500).json({
                msg: "Failed to generate image. Try again later.",
                success: false,
                error: true
            });
        }

        const resultImage = `data:image/png;base64,${base64Image}`;

        // Deduct credits after successful API call
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
        console.error("Server error:", error.message);
        return res.status(500).json({
            msg: "Internal Server Error",
            success: false,
            error: true
        });
    }
};

module.exports = { 
    generateImage
};
