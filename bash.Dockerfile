# this image can be used to test bash commands
FROM ubuntu:22.04

# allows to run the image indefinitely
CMD ["sh", "-c", "tail -f /dev/null"]