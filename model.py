import torch
import torchvision
import torchvision.transforms as transforms
from torchvision import datasets
import matplotlib.pyplot as plt
import numpy as np
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from PIL import Image


transform = transforms.Compose(
    [transforms.ToTensor(),
     transforms.Resize([512, 512]),
     transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))])

train_data = datasets.ImageFolder(root="./images", transform=transform)

# test_data = datasets.ImageFolder(root="./images", transform=transform)

class_names = train_data.classes


# batch_size = len(class_names)

# trainloader = torch.utils.data.DataLoader(train_data, batch_size=batch_size,
#                                           shuffle=True, num_workers=0)

# testloader = torch.utils.data.DataLoader(test_data, batch_size=batch_size,
#                                          shuffle=True, num_workers=0)

# classes = (class_names)


# functions to show an image


def imshow(img):
    img = img / 2 + 0.5
    npimg = img.numpy()
    plt.imshow(np.transpose(npimg, (1, 2, 0)))
    plt.show()


class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 6, 5)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(6, 16, 5)
        self.fc_input_size = self.calculate_fc_input_size()
        self.fc1 = nn.Linear(self.fc_input_size, 120)
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = torch.flatten(x, 1) # flatten all dimensions except batch
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x
    def calculate_fc_input_size(self):
        # Dummy input to calculate the size after convolutional and pooling layers
        x = torch.randn(1, 3, 512, 512)  # Assuming input size of (512, 512)
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        return x.size(1) * x.size(2) * x.size(3)





PATH = './albums_net.pth'
net = Net()
net.load_state_dict(torch.load(PATH))
net.eval()
criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(net.parameters(), lr=0.001, momentum=0.9)
# dataiter = iter(testloader)
# images, labels = next(dataiter)

input_image_path = './images/Thriller/Thriller2.jpg'  # Change this to the path of your image
input_image = Image.open(input_image_path)
input_image = transform(input_image).unsqueeze(0)
with torch.no_grad():
    output = net(input_image)
    probabilities = torch.softmax(output, dim=1)  # Convert raw scores to probabilities
    _, predicted_class = torch.max(output, 1)

predicted_class_name = class_names[predicted_class.item()]
print('Predicted class:', predicted_class_name)
print('Probabilities:', probabilities)

output_image = Image.open('images/' + predicted_class_name + "/" + predicted_class_name + '.jpg')

plt.imshow(output_image)
plt.axis('off')
plt.show()
