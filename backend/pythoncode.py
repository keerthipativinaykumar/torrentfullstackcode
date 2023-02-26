
import libtorrent as lt
import requests
from google.colab import drive

# Mount Google Drive
drive.mount('/content/drive')

# Set download directory
download_dir = "/content/drive/folders/1CoI2kjtnKXIk6cAACxcs_GBq35X1yjPP"

# Set session parameters
ses = lt.session()
ses.listen_on(6881, 6891)
params = {"save_path": download_dir}

# Create empty downloads list
downloads = []

# Loop to add magnet links
def add_magnet_link(magnet_link):
    if magnet_link.lower() == "":
        return
    download = lt.add_magnet_uri(ses, magnet_link, params)
    download.set_sequential_download(True)
    downloads.append(download)
    return True

def start_downloads():
    result = []
    for download in downloads:
        status = download.status()
        while not status.is_seeding:
            status = download.status()
            progress = status.progress * 100
            result.append("Download progress: {:.2f}%".format(progress))
        result.append("Download complete!")
    return result

