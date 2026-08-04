import serial

arduino = serial.Serial(
    port='COM3',
    baudrate=9600,
    timeout=1
)

def get_sensor_data():

    line = arduino.readline().decode().strip()

    if line:

        values = line.split(",")

        if len(values) == 6:

            return {

                "lightIntensity":
                    float(values[0]),

                "voltage":
                    float(values[1]),

                "expectedOutput":
                    float(values[2]),

                "actualOutput":
                    float(values[3]),

                "efficiency":
                    float(values[4]),

                "isCleaning":
                    values[5] == "1"
            }

    return None