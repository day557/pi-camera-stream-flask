from flask import Flask, Response
from flask_cors import CORS
from camera import VideoCamera

# Create an instance of the Flask class
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for the app
CORS(app, resources={r"/test": {"origins": "http://localhost:3000"}})

# Create an instance of the VideoCamera class
pi_camera = VideoCamera()


# Define a generator function to capture camera frames
def gen(camera):
    while True:
        # Get camera frame continuously
        frame = camera.get_frame()

        # Yield the frame as multipart response
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


# Define a route for serving the video feed at the root ("/")
@app.route('/')
def video_feed():
    # Return a multipart response with the video feed
    return Response(gen(pi_camera),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


# Start the Flask application if the script is executed directly
if __name__ == '__main__':
    # Run the app on all available network interfaces (0.0.0.0) and disable debugging
    app.run(host='0.0.0.0', debug=False)
