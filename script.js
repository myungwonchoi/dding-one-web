const $ = (id) => document.getElementById(id);
let manifest = {};

async function route() {
    const [_, pid, file] = location.hash.split('/');
    const plugin = manifest.plugins.find(p => p.id === pid) || manifest.plugins[0];
    const doc = plugin.docs.find(d => d.file === file) || plugin.docs[0];

    // URL 보정
    if (location.hash !== `#/${plugin.id}/${doc.file}`) {
        location.hash = `#/${plugin.id}/${doc.file}`;
        return;
    }

    // UI 업데이트
    $('plugin-select').value = plugin.id;
    $('menu-list').innerHTML = plugin.docs.map(d => 
        `<li class="${d.file === doc.file ? 'active' : ''}"><a href="#/${plugin.id}/${d.file}">${d.label}</a></li>`
    ).join('');

    // 문서 로드
    const res = await fetch(`docs/${plugin.id}/${doc.file}`);
    $('markdown-viewer').innerHTML = res.ok ? marked.parse(await res.text()) : 'File not found.';
    window.scrollTo(0, 0);
}

async function init() {
    try {
        manifest = await (await fetch('docs/manifest.json')).json();
        $('plugin-select').innerHTML = manifest.plugins.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        $('plugin-select').onchange = (e) => {
            const p = manifest.plugins.find(p => p.id === e.target.value);
            location.hash = `#/${p.id}/${p.docs[0].file}`;
        };
        window.onhashchange = route;
        route();
    } catch (e) {
        $('markdown-viewer').innerHTML = 'Failed to load manifest.';
    }
}

document.addEventListener('DOMContentLoaded', init);
