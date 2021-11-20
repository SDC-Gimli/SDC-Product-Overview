import gdown
import sys

url ='https://drive.google.com/uc?id=' + sys.argv[1]

output = sys.argv[2]

gdown.download(url, output, quiet=False)

