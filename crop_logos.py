
import Cocoa

def process_img(in_path, out_path):
    img = Cocoa.NSImage.alloc().initWithContentsOfFile_(in_path)
    if not img:
        print('Could not load', in_path)
        return
    # Find bounding box of non-transparent / non-white pixels
    rep = img.representations()[0]
    w = rep.pixelsWide()
    h = rep.pixelsHigh()
    print(in_path, 'size:', w, h)

process_img('logo_amocrm.png', 'logo_amocrm_cropped.png')
process_img('logo_bitrix24.webp', 'logo_bitrix24_cropped.png')
process_img('logo_1c.png', 'logo_1c_cropped.png')
