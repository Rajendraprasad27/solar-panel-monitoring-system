def detect_fault(data):

    status = "Normal Operation"

    fault = None

    if data["lightIntensity"] < 200:

        status = "Low Light Condition"

    elif (
        data["efficiency"] < 60
        and data["lightIntensity"] > 600
    ):

        status = "Efficiency Drop Detected"

        fault = "Dust Accumulation / Shading"

    return {
        "status": status,
        "faultType": fault
    }