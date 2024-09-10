import projectUploder from "../models/projectUploadModel.js";
import { uploadImageOnCloud } from '../Utils/coludinary.js'

const projectDataUploder = async (req, res) => {
  const { title, description, link, altMessage } = req.body;

  if (!title || !description || !link || !altMessage) {
    return res.status(400).json({
      success: false,
      message: "Provide all fields"
    });
  }

  let projectImage = {};

  if (!req.file) {
    return res.status(400).send({
      success: false,
      message: "Project image is required",
    });
  }

  try {
    const result = await uploadImageOnCloud(req.file.path, "projectImage");
    projectImage = {
      public_id: result.public_id,
      imageUrl: result.secure_url,
    };

    const projectData = new projectUploder({
      title,
      description,
      link,
      altMessage,
      projectImage,
    });

    await projectData.save();

    res.status(201).json({
      success: true,
      message: "Data has been sent to the server",
      data: projectData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getProjectData = async (req, res) => {
  try {
    const data = await projectUploder.find();

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'No project data found',
      });
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export { projectDataUploder, getProjectData };
