import cv2 as cv
import json


class VideoCamera(object):
    def __init__(self, file_type=".jpg", settings_file="camera_settings.json",
                 class_file_path="/home/admin/PiCamera/Object_Detection_Files/coco.names",
                 config_path="/home/admin/PiCamera/Object_Detection_Files/ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt",
                 weights_path="/home/admin/PiCamera/Object_Detection_Files/frozen_inference_graph.pb"):
        self.vs = cv.VideoCapture(0)
        self.file_type = file_type
        self.class_file_path = class_file_path
        self.config_path = config_path
        self.weights_path = weights_path
        self.load_settings(settings_file)
        self.classNames = self.load_class_names(class_file_path)
        self.net = self.load_object_detection_model(config_path, weights_path)

    def load_settings(self, settings_file):
        try:
            with open(settings_file, 'r') as file:
                settings = json.load(file)
                self.fps = settings.get('fps', 15)
                self.width = settings.get('width', 640)
                self.height = settings.get('height', 480)
        except FileNotFoundError:
            # Use default values if the file is not found
            self.fps = 15
            self.width = 640
            self.height = 480

        # Create a new video capture object with the updated settings
        self.vs = cv.VideoCapture(0)
        self.vs.set(cv.CAP_PROP_FRAME_WIDTH, self.width)
        self.vs.set(cv.CAP_PROP_FRAME_HEIGHT, self.height)
        self.vs.set(cv.CAP_PROP_FPS, self.fps)

    def load_class_names(self, class_file_path):
        # Load class names from the file
        with open(class_file_path, "rt") as f:
            return f.read().rstrip("\n").split("\n")

    def load_object_detection_model(self, config_path, weights_path):
        # Load object detection model with specified configuration and weights
        net = cv.dnn_DetectionModel(weights_path, config_path)
        net.setInputSize(320, 320)
        net.setInputScale(1.0 / 127.5)
        net.setInputMean((127.5, 127.5, 127.5))
        net.setInputSwapRB(True)
        return net

    def process_frame(self, frame):
        # Perform object detection on the frame
        classIds, confs, bbox = self.net.detect(
            frame, confThreshold=0.45, nmsThreshold=0.2)

        if len(classIds) != 0:
            for classId, confidence, box in zip(classIds.flatten(), confs.flatten(), bbox):
                className = self.classNames[classId - 1]

                # Check if the detected object is a person
                if className.lower() == 'person':
                    # Draw bounding box, class name, and confidence on the frame
                    cv.rectangle(frame, box, color=(0, 255, 0), thickness=2)
                    cv.putText(frame, className.upper(), (box[0] + 10, box[1] + 30),
                               cv.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)
                    cv.putText(frame, str(round(confidence * 100, 2)), (box[0] + 200, box[1] + 30),
                               cv.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)

    def get_frame(self):
        # Read a frame from the video source
        ret, frame = self.vs.read()

        if not ret or frame is None:
            return b''  # Return an empty frame if the capture fails or the frame is empty

        # Process the frame for object detection
        self.process_frame(frame)

        # Convert the frame to bytes
        ret, jpeg = cv.imencode(self.file_type, frame)
        return jpeg.tobytes()
