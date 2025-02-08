import healthDataModel from "../models/healthModel";


// for creating a new health data
export const healthCreateController = async (req, res) => {

    const { heartRate,
        bloodPressure,
        respiratoryRate,
        bodyTemperature,
        oxygenSaturation,
        weight,
        height,
        electroCardioGram,
        bloodGlucoseLevels,
        urineOutput,
        userId } = req.body;

    if (!heartRate || !respiratoryRate || !bodyTemperature || !oxygenSaturation || !weight || !height || !electroCardioGram || !bloodGlucoseLevels || !urineOutput || !userId || !bloodPressure) {
        return res.status(400).json({ message: "Please provide all the fields" });
    }

    try {
        const healthdata = await healthDataModel.create({
            heartRate,
            bloodPressure,
            respiratoryRate,
            bodyTemperature,
            oxygenSaturation,
            weight,
            height,
            electroCardioGram,
            bloodGlucoseLevels,
            urineOutput,
            userId,
        })
        res.status(201).json({ message: "Health Data Created", healthdata });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });

    }
}


// for getting all the health data
export const healthGetAllController = async (req, res) => {

    try {
        const healthdata = await healthDataModel.find()
        res.status(200).json({ healthdata });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });

    }
}


// for getting a single health data
export const healthGetSingleController = async (req, res) => {

    const {healthId} = req.params;

    try {
        const healthdata = await healthDataModel.findById(healthId)
        res.status(200).json({ healthdata });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });

    }
}



// for updating the health data
export const healthUpdateController = async (req, res) => {

    const {healthId} = req.params;

    const { heartRate,
        bloodPressure,
        respiratoryRate,
        bodyTemperature,
        oxygenSaturation,
        weight,
        height,
        electroCardioGram,
        bloodGlucoseLevels,
        urineOutput,
        userId } = req.body;

    

    try {
        const response = await healthDataModel.findByIdAndUpdate(healthId, {
            heartRate,
            bloodPressure,
            respiratoryRate,
            bodyTemperature,
            oxygenSaturation,
            weight,
            height,
            electroCardioGram,
            bloodGlucoseLevels,
            urineOutput,
            userId,
        })
        res.status(201).json({ message: "Health Data Updated", response });

        
    } catch (error) {
        res.status(500).json({ message: "Server Error" });

    }
}
