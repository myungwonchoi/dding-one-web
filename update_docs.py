import os
import json

def generate_manifest():
    docs_dir = 'docs'
    manifest_path = os.path.join(docs_dir, 'manifest.json')
    
    # 플러그인 폴더 목록 가져오기 (폴더만)
    plugins = []
    
    # docs 폴더 내의 서브 디렉토리들을 탐색
    subdirs = [d for d in os.listdir(docs_dir) if os.path.isdir(os.path.join(docs_dir, d))]
    
    for subdir in subdirs:
        plugin_id = subdir
        plugin_name = subdir.replace('_', ' ').title() # 폴더명을 이름으로 변환 (예: render_tracker -> Render Tracker)
        
        # 해당 폴더 내의 .md 파일들 찾기
        md_files = [f for f in os.listdir(os.path.join(docs_dir, subdir)) if f.endswith('.md')]
        md_files.sort() # 이름순 정렬
        
        doc_list = []
        for file in md_files:
            # 파일명을 라벨로 변환 (예: 01_intro.md -> Intro)
            label = file.replace('.md', '').split('_')[-1].capitalize()
            doc_list.append({
                "label": label,
                "file": file
            })
            
        if doc_list:
            plugins.append({
                "id": plugin_id,
                "name": plugin_name,
                "docs": doc_list
            })
            
    manifest_data = {"plugins": plugins}
    
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest_data, f, indent=4, ensure_ascii=False)
        
    print(f"Successfully generated {manifest_path}")

if __name__ == "__main__":
    generate_manifest()
