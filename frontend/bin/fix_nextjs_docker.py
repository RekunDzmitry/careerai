import json
import os
from distutils.dir_util import copy_tree
import shutil

class DockerPatcher:
    def __init__(self):
        self.path = os.getenv('NEXTJS_PATH', '/ui')

    def fix_components_json(self):
        path_to_components = os.path.join(self.path, 'components.json')
        components = {}
        
        with open(path_to_components, 'r') as f:
            components = json.load(f)

        aliases = components['aliases']
        aliases["components"] = "components"
        aliases["utils"] = "lib/utils"

        with open(path_to_components, 'w') as f:
            json.dump(components, f, indent=4)
    
    def fix_folders(self):
        src_components_folder = os.path.join(self.path, '@', 'components')
        dest_components_folder = os.path.join(self.path, 'components')
        src_lib_folder = os.path.join(self.path, '@', 'lib')
        dest_lib_folder = os.path.join(self.path, 'lib')

        copy_tree(src_components_folder, dest_components_folder)
        copy_tree(src_lib_folder, dest_lib_folder)

        shutil.rmtree(os.path.join(self.path, '@'))

if __name__ == "__main__":
    patcher = DockerPatcher()
    patcher.fix_components_json()
    patcher.fix_folders()
        