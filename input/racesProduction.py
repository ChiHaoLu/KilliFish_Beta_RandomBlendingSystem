'''
Step.1 - Import the Module
'''
import cv2
import os
from natsort import natsorted

'''
Step.2 - Construct the Data Structure
'''
class PART:
    def __init__(self, part, filename, img):
        self.part = part
        self.filename = filename
        self.name = self.name_init()
        self.img = img


    def name_init(self):
        n = self.filename.split("_")
        return n[2]

class DATA:
    def __init__(self, name, numbers, quantities):
        self.name = name
        self.numbers = numbers # 部位編號
        self.quantities = quantities # 部位數量
        self.location = self.location_init() # 部位資料夾相對位置，string
        self.ImgBase = self.load_ImgBase() # list

    
    def location_init(self):
        location = "/part_image/" + str(self.numbers) + "-" + str(self.name)
        return location
    
    def load_ImgBase(self):
        self.ImgBase = []
        folder = "C:\\Users\\qazws\\Desktop\\All In One NFT Website\\MainProject\\LayerBlending\\input\\part_image\\" + str(self.numbers) + "-" + str(self.name)
        lst = natsorted(os.listdir(folder))
        for filename in lst:
            img = cv2.imread(os.path.join(folder, filename), cv2.IMREAD_UNCHANGED)
            img = cv2.resize(img, (1000, 1000))
            if img is not None:
                self.ImgBase.append(PART(self.name, filename, img))
    
        return self.ImgBase

    def show_ImgBase(self):
        for i in range(self.quantities):
            showing_img = cv2.resize(self.ImgBase[i].img, (720, 720)) # 修改大小之後的圖片，以方便在電腦上顯示
            cv2.imshow("Killifish Image", showing_img)
            cv2.waitKey()
    
    def produceRaces(self):
        Races = "{"
        Races += '\n  name: "' + self.name + "\","
        Races += '\n  elements: ['
        for i in range(self.quantities):
            Races += "\n    {"
            ##############################
            Races += "\n      id: " + str(i) + ","
            Races += "\n      name: \"" + self.ImgBase[i].name + "\","
            Races += "\n      path: `${dir}" + self.location + "/" + self.ImgBase[i].filename + "`,"
            ##############################
            Races += "\n    },"
        Races += "\n  ],"
        Races += "\n  position: { x: 0, y: 0 },"
        Races += "\n  size: { width: width, height: height },"
        Races += "\n  number: " + str(self.quantities) + ","
        Races += "\n},"
        f = open('races.txt','a')
        print(Races)
        f.write(Races)

'''
Step.3 - Declaration
'''
logo = DATA("logo", 1, 5)
congra = DATA("congra", 2, 5)
middlelogo = DATA("middlelogo", 3, 5)
background = DATA("background", 4, 9)

'''
Step.4 - Generation
'''
background.produceRaces()
middlelogo.produceRaces()
congra.produceRaces()
logo.produceRaces()

