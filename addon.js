(function () {
    'use strict';
	
function addonStart() {
	    
/*
 * * * Иконки разделов плагина
 */
var icon_add_plugin= '<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="256px" height="256px" viewBox="0 0 512 512" xml:space="preserve" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  .st0{fill:#ffffff;}  </style> <g> <path class="st0" d="M432.531,229.906c-9.906,0-19.125,2.594-27.313,6.375v-51.656c0-42.938-34.922-77.875-77.859-77.875h-51.641 c3.781-8.156,6.375-17.375,6.375-27.281C282.094,35.656,246.438,0,202.625,0c-43.828,0-79.484,35.656-79.484,79.469 c0,9.906,2.594,19.125,6.359,27.281H77.875C34.938,106.75,0,141.688,0,184.625l0.047,23.828H0l0.078,33.781 c0,23.031,8.578,36.828,12.641,42.063c12.219,15.797,27.094,18.172,34.891,18.172c11.953,0,23.141-4.953,33.203-14.703l0.906-0.422 l1.516-2.141c1.391-1.359,6.328-5.484,14.016-5.5c16.344,0,29.656,13.297,29.656,29.672c0,16.344-13.313,29.656-29.672,29.656 c-7.672,0-12.609-4.125-14-5.5l-1.516-2.141l-0.906-0.422c-10.063-9.75-21.25-14.703-33.203-14.703 c-7.797,0.016-22.672,2.375-34.891,18.172c-4.063,5.25-12.641,19.031-12.641,42.063L0,410.281h0.047L0,434.063 C0,477.063,34.938,512,77.875,512h54.563v-0.063l3.047-0.016c23.016,0,36.828-8.563,42.063-12.641 c15.797-12.219,18.172-27.094,18.172-34.891c0-11.953-4.953-23.141-14.688-33.203l-0.438-0.906l-2.125-1.516 c-1.375-1.391-5.516-6.328-5.516-14.016c0-16.344,13.313-29.656,29.672-29.656c16.344,0,29.656,13.313,29.656,29.656 c0,7.688-4.141,12.625-5.5,14.016l-2.125,1.516l-0.438,0.906c-9.75,10.063-14.703,21.25-14.703,33.203 c0,7.797,2.359,22.672,18.172,34.891c5.25,4.078,19.031,12.641,42.063,12.641l17,0.047V512h40.609 c42.938,0,77.859-34.938,77.859-77.875v-51.641c8.188,3.766,17.406,6.375,27.313,6.375c43.813,0,79.469-35.656,79.469-79.484 C512,265.563,476.344,229.906,432.531,229.906z M432.531,356.375c-19.031,0-37.469-22.063-37.469-22.063 c-3.344-3.203-6.391-4.813-9.25-4.813c-2.844,0-5.469,1.609-7.938,4.813c0,0-5.125,5.891-5.125,19.313v80.5 c0,25.063-20.313,45.391-45.391,45.391h-23.813l-33.797-0.078c-15.438,0-22.188-5.875-22.188-5.875 c-3.703-2.859-5.563-5.875-5.563-9.172c0-3.266,1.859-6.797,5.563-10.594c0,0,17.219-13.891,17.219-39.047 c0-34.313-27.844-62.156-62.156-62.156c-34.344,0-62.156,27.844-62.156,62.156c0,25.156,17.219,39.047,17.219,39.047 c3.688,3.797,5.531,7.328,5.531,10.594c0,3.297-1.844,6.313-5.531,9.172c0,0-6.766,5.875-22.203,5.875l-33.797,0.078H77.875 c-25.063,0-45.375-20.328-45.375-45.391l0.094-48.203h-0.047l0.016-9.422c0-15.422,5.875-22.203,5.875-22.203 c2.859-3.703,5.875-5.531,9.156-5.531s6.813,1.828,10.609,5.531c0,0,13.891,17.234,39.047,17.234 c34.313-0.016,62.156-27.844,62.156-62.156c-0.016-34.344-27.844-62.156-62.156-62.156c-25.156,0-39.047,17.219-39.047,17.219 c-3.797,3.688-7.328,5.531-10.609,5.531s-6.297-1.828-9.156-5.531c0,0-5.875-6.781-5.875-22.203v-1.156h0.031L32.5,184.625 c0-25.063,20.313-45.375,45.375-45.375h80.5c13.422,0,19.313-5.125,19.313-5.125c6.422-4.938,6.422-10.531,0-17.188 c0,0-22.063-18.438-22.063-37.469c0-25.953,21.047-46.984,47-46.984c25.938,0,46.984,21.031,46.984,46.984 c0,19.031-22.047,37.469-22.047,37.469c-6.438,6.656-6.438,12.25,0,17.188c0,0,5.875,5.125,19.281,5.125h80.516 c25.078,0,45.391,20.313,45.391,45.375v80.516c0,13.422,5.125,19.297,5.125,19.297c2.469,3.219,5.094,4.813,7.938,4.813 c2.859,0,5.906-1.594,9.25-4.813c0,0,18.438-22.047,37.469-22.047c25.938,0,46.969,21.047,46.969,46.984 C479.5,335.344,458.469,356.375,432.531,356.375z"></path> </g> </g></svg>'
var icon_add_interface_plugin = '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0"/><path fill="currentColor" fill-rule="evenodd" d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.088c0 1.909 0 3.471-.104 4.743c-.104 1.28-.317 2.347-.795 3.235q-.314.586-.785 1.057c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.793-.793-1.203-1.78-1.42-3.006c-.215-1.203-.254-2.7-.262-4.558Q1.25 12.792 1.25 12v-.058c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19m-5.33 1.676c-1.278.172-2.049.5-2.618 1.069c-.57.57-.897 1.34-1.069 2.619c-.174 1.3-.176 3.008-.176 5.386v.844l1.001-.876a2.3 2.3 0 0 1 3.141.104l4.29 4.29a2 2 0 0 0 2.564.222l.298-.21a3 3 0 0 1 3.732.225l2.83 2.547c.286-.598.455-1.384.545-2.493c.098-1.205.099-2.707.099-4.653c0-2.378-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176" clip-rule="evenodd"/></svg></div><div style="font-size:1.3em">Интерфейс</div></div>'
var icon_add_management_plugin = '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 1024 1024"><path fill="currentColor" d="m960.496 415.056l-82.129-18.224c-6.4-20.48-14.784-40.08-24.4-58.927l44.431-74.032c16.592-26.512 24.976-65.52 0-90.512l-45.28-45.248c-24.976-24.992-67.151-20.496-92.623-2.832l-72.032 45.887c-18.689-9.696-38.225-18-58.529-24.56l-18.431-83.12C605.999 33.009 579.343 0 543.999 0h-64c-35.344 0-57.008 33.504-64 64l-20.528 82.128c-21.68 6.912-42.496 15.744-62.336 26.208l-73.84-47.024c-25.456-17.664-67.648-22.16-92.624 2.832l-45.264 45.248c-24.992 25.008-16.608 64 0 90.512l46.752 77.92c-8.767 17.664-16.544 35.936-22.544 55.024l-82.112 18.224C33.007 420.56 0 447.216 0 482.56v64c0 35.344 33.504 57.008 64 64l83.152 20.784c5.745 17.632 12.928 34.56 21.056 50.976l-46.8 78c-16.591 26.496-24.975 65.504 0 90.496l45.28 45.248c24.976 25.008 67.152 20.496 92.624 2.847l74-47.152c19.952 10.528 40.88 19.44 62.704 26.337L416.495 960c7.008 30.496 28.656 64 64 64h64c35.344 0 62-33.007 67.504-63.504l18.464-83.343c20.096-6.496 39.376-14.689 57.84-24.257l72.192 46c25.472 17.664 67.664 22.16 92.624-2.848L898.4 850.8c24.976-25.008 16.592-64 0-90.496l-44.463-74.128c8.944-17.568 16.688-35.84 22.912-54.848L960 610.56c30.496-7.008 64-28.656 64-64v-64c0-35.344-32.992-62-63.504-67.504m-.465 126.992c-2.72 1.952-7.842 4.635-14.338 6.139l-118.656 29.631l-11.008 33.632c-4.975 15.153-11.407 30.529-19.119 45.712l-16.064 31.569l62.688 104.528c4 6.4 5.872 12.127 6.432 15.503l-42.096 42.033c-4.064-1.28-8.688-2.945-10.912-4.464l-105.344-67.184l-32.752 16.945c-15.776 8.192-31.969 14.976-48.097 20.192l-34.88 11.28l-26.368 119.12c-1.216 6.368-4.624 11.504-6.96 13.344h-57.6c-1.951-2.72-4.623-7.84-6.112-14.32L449.39 827.9l-34.095-10.817c-17.569-5.536-35.088-12.912-52.144-21.904l-32.912-17.376l-105.36 67.152c-4.304 2.912-8.912 4.56-13.088 4.56l-41.968-40.847c.56-3.311 2.304-8.783 5.792-14.367l65.456-109.056l-15.568-31.344c-7.264-14.784-13.024-28.656-17.504-42.4l-10.992-33.664L79.518 548.46c-7.392-1.68-12.736-4.432-15.52-6.4v-59.504a.3.3 0 0 0 .145.032c1.072 0 6.336-3.745 10.72-4.544l120.72-26.737l11.087-35.28c4.512-14.368 10.672-29.344 18.816-45.775l15.568-31.36l-64.767-107.92c-4.016-6.432-5.872-12.16-6.432-15.52l42.08-42.065c4.08 1.312 8.672 2.96 10.88 4.48l107.312 68.4l32.88-17.344c16.88-8.895 34.336-16.239 51.904-21.823l34.016-10.832L478.11 79.501c1.697-7.391 4.416-12.735 6.4-15.52H544c-.433.657 3.68 6.24 4.527 10.865l26.88 121.408l34.848 11.264c16.336 5.28 32.752 12.16 48.72 20.448l32.752 17.008l103.152-65.712c4.32-2.945 8.944-4.576 13.088-4.576l42 40.816c-.56 3.328-2.32 8.816-5.808 14.416l-63.344 105.488l16.16 31.616c8.72 17.056 15.376 33.056 20.32 48.928l11.056 35.344L946.64 477.55c7.153 1.328 12.721 5.456 13.905 7.696zM512.43 319.674c-106.272 0-192.736 86.288-192.736 192.32c0 106.016 86.464 192.304 192.736 192.304s192.736-86.288 192.736-192.304c0-106.032-86.464-192.32-192.736-192.32m-.432 320.32c-70.576 0-128-57.424-128-128c0-70.592 57.424-128 128-128c70.592 0 128 57.408 128 128c0 70.576-57.424 128-128 128"/></svg></div><div style="font-size:1.3em">Управление</div></div>'
var icon_add_online_plugin = '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#currentColor" class="fill-000000"></path></svg></div><div style="font-size:1.3em">Онлайн</div></div>'
var icon_add_torrent_plugin = '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M13.684 23.94a12.01 12.01 0 0 0 9.599-7.79c-.118.044-.26.096-.432.147c-2 .59-3.404-.466-3.687-.649c-.283-.18-.587-.48-.643-.464c-.183 1.132-1.218 2.706-3.58 3.42c-1.295.391-2.687.4-3.681-.157l.328.822c.13.328.351.866.488 1.192c0 0 .858 2.044 1.608 3.48M2.723 7.153l3.54-.66c.323-.059.68.124.794.407l2.432 6.07c.332.633.399.773.615 1.043c0 0 1.68 2.398 4.24 1.812c1.726-.394 2.532-1.69 2.587-2.612c.057-.296-.032-.669-.185-1.016L13.832 5.61c-.117-.266.022-.527.306-.581l2.953-.55a.69.69 0 0 1 .706.376l3.227 6.91c.13.276.394.712.588.966c0 0 .671.964 1.747.78c.266 0 .569-.143.569-.143q.071-.645.072-1.31c0-6.627-5.373-12-12.002-12C5.372.06 0 5.433 0 12.06c0 5.319 3.46 9.827 8.252 11.402a25 25 0 0 1-.919-2.121L2.298 7.808c-.111-.297.083-.59.425-.654"/></svg></div><div style="font-size:1.3em">Торренты</div></div>'
var icon_add_tv_plugin = '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" stroke-width="1.5" d="M22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16v-4c0-2.828 0-4.243.879-5.121C3.757 6 5.172 6 8 6h8c2.828 0 4.243 0 5.121.879C22 7.757 22 9.172 22 12z"/><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="m9 2l3 3.5L15 2m1 4v16"/><path fill="currentColor" d="M20 16a1 1 0 1 0-2 0a1 1 0 0 0 2 0m0-4a1 1 0 1 0-2 0a1 1 0 0 0 2 0"/></g></svg></div><div style="font-size:1.3em">ТВ</div></div>'
var icon_add_music_plugin = '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.25a.75.75 0 0 0-.75.75v11.26a4.25 4.25 0 1 0 1.486 2.888A1 1 0 0 0 12.75 17V7.75H18a2.75 2.75 0 1 0 0-5.5z"/></svg></div><div style="font-size:1.3em">Музыка</div></div>'
var icon_add_radio_plugin = '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 26 26"><path fill="currentColor" d="M23.5.063c-.794 0-1.438.643-1.438 1.437L4.657 6.313c-.2-.076-.43-.125-.656-.125A1.81 1.81 0 0 0 2.187 8v.125C.933 8.484 0 9.63 0 11v11c0 1.656 1.344 3 3 3h20c1.656 0 3-1.344 3-3V11c0-1.656-1.344-3-3-3H5.812c0-.277-.076-.546-.187-.781l16.656-5c.25.428.688.719 1.219.719a1.437 1.437 0 1 0 0-2.876zm-6 10.75a5.696 5.696 0 0 1 5.688 5.687a5.696 5.696 0 0 1-5.688 5.688a5.697 5.697 0 0 1-5.688-5.688a5.697 5.697 0 0 1 5.688-5.688zm-13 .093c.877 0 1.594.717 1.594 1.594s-.717 1.594-1.594 1.594A1.597 1.597 0 0 1 2.906 12.5c0-.877.716-1.594 1.594-1.594m13 1.281c-.937 0-1.793.306-2.5.813h5a4.26 4.26 0 0 0-2.5-.813M14 14a4.3 4.3 0 0 0-.531 1h8.062A4.4 4.4 0 0 0 21 14zm-9.5 1.906c.877 0 1.594.717 1.594 1.594s-.717 1.594-1.594 1.594A1.597 1.597 0 0 1 2.906 17.5c0-.877.716-1.594 1.594-1.594m8.75.094c-.02.166-.063.328-.063.5s.043.334.063.5h8.5c.02-.166.063-.328.063-.5s-.044-.334-.063-.5zm.219 2q.202.538.531 1h7q.33-.462.531-1H13.47zM15 20a4.27 4.27 0 0 0 2.5.813c.938 0 1.793-.306 2.5-.813z"/></svg></div><div style="font-size:1.3em">Радио</div></div>'
var icon_add_sisi_plugin = '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path fill="currentColor" d="M51.348 15.912c-3.332-3.347-7.33-4.796-11.498-4.796c-.359 0-.721.016-1.08.038C37.734 6.492 36.295 2 36.295 2s-6.291 3.991-9.97 7.716c-4.255-3.327-9.149-6.391-9.149-6.391s-1.044 7.646-.678 13.247c-5.577-.361-13.188.692-13.188.692s3.051 4.912 6.368 9.185C5.97 30.146 2 36.47 2 36.47s4.646 1.497 9.382 2.538c-.159 4.421 1.261 8.681 4.776 12.213C23.599 58.692 36.494 62 46.373 62c5.729-.001 10.445-1.113 12.492-3.17c5.522-5.549 4.184-31.161-7.517-42.918m6.074 41.482c-1.236 1.242-4.789 2.57-11.049 2.571c-9.275 0-21.77-3.147-28.771-10.18c-8.058-8.096-3.363-20.183 4.41-27.987c5.389-5.413 12.057-8.646 17.838-8.646c3.9.001 7.283 1.411 10.055 4.198c4.908 4.93 8.424 13.172 9.643 22.61c1.147 8.891-.2 15.499-2.126 17.434"/><path fill="currentColor" d="M40.172 18.321c.578.403 1.215.606 1.771.607c.541 0 1.006-.19 1.271-.573c.545-.775.063-2.052-1.072-2.848c-.58-.405-1.215-.607-1.773-.607c-.539 0-1.006.19-1.273.572c-.543.776-.063 2.054 1.076 2.849m3.902 14.408a1.34 1.34 0 0 0-.891.31c-.715.621-.557 1.976.352 3.025c.604.695 1.389 1.081 2.057 1.08c.34.001.65-.099.891-.309c.717-.621.557-1.975-.352-3.024c-.604-.696-1.387-1.081-2.057-1.082m-8.781-8.797a1.3 1.3 0 0 0-.865.294c-.727.609-.592 1.968.303 3.031c.602.715 1.391 1.114 2.064 1.115c.33 0 .629-.097.867-.295c.727-.61.59-1.966-.303-3.033c-.601-.714-1.392-1.113-2.066-1.112m17.111 2.537c-.518-.945-1.369-1.53-2.111-1.53a1.26 1.26 0 0 0-.604.148c-.832.456-.967 1.813-.301 3.032c.52.945 1.367 1.529 2.111 1.529c.213 0 .418-.047.604-.148c.833-.455.967-1.812.301-3.031m2.551 11.924q-.153 0-.303.039c-.918.24-1.379 1.521-1.027 2.866c.313 1.198 1.162 2.037 1.994 2.038q.153 0 .303-.038c.918-.239 1.379-1.523 1.027-2.868c-.312-1.196-1.164-2.037-1.994-2.037M53.76 51.021c-.354.001-.674.105-.918.327c-.703.636-.518 1.987.414 3.019c.607.671 1.381 1.038 2.041 1.039c.354-.001.676-.106.922-.329c.701-.636.516-1.987-.418-3.017c-.606-.669-1.379-1.039-2.041-1.039m-20.837-.979c-.569-.384-1.189-.573-1.736-.572c-.559 0-1.041.198-1.309.598c-.527.788-.02 2.054 1.135 2.825c.57.383 1.191.573 1.736.573c.561 0 1.042-.2 1.309-.6c.528-.786.02-2.053-1.135-2.824m-11.758-3.359c-.569-.382-1.189-.571-1.735-.571c-.561 0-1.042.199-1.309.597c-.527.787-.02 2.055 1.134 2.825c.57.382 1.191.574 1.738.573c.559 0 1.041-.199 1.307-.6c.526-.786.02-2.052-1.135-2.824m21.382 7.939a3.4 3.4 0 0 0-1.275-.259c-.797-.001-1.463.326-1.701.91c-.354.877.404 2.013 1.691 2.531c.434.175.871.258 1.275.257c.797 0 1.465-.324 1.699-.908c.356-.878-.4-2.012-1.689-2.531m2.617-9.926c-.543-.323-1.119-.481-1.633-.481c-.617-.001-1.143.229-1.406.672c-.486.814.09 2.053 1.283 2.763c.543.322 1.119.48 1.635.48c.615 0 1.141-.229 1.404-.672c.485-.816-.09-2.054-1.283-2.762m-10.596-6.943c-.602-.5-1.295-.758-1.895-.757c-.465-.001-.873.155-1.138.474c-.604.729-.229 2.042.839 2.928c.603.498 1.297.758 1.897.758c.465 0 .871-.156 1.137-.475c.604-.73.231-2.043-.84-2.928m-10.701-14.53c-.385.001-.73.119-.982.368c-.676.665-.434 2.008.539 2.997c.611.618 1.364.953 2.009.954c.384-.001.729-.119.981-.368c.676-.666.435-2.008-.539-2.996c-.612-.621-1.364-.954-2.008-.955m-1.055 11.751c-.598-.473-1.275-.716-1.863-.715c-.484 0-.909.163-1.175.5c-.589.741-.184 2.046.904 2.906c.598.474 1.276.715 1.864.715c.484 0 .908-.161 1.174-.499c.587-.742.184-2.045-.904-2.907"/></svg></div><div style="font-size:1.3em">18+</div></div>'
var ads = '<div style="padding: 0.3em 0.3em; padding-top: 0;"><div style="background: #3e3e3e; padding: 0.5em; border-radius: 1em;"><div style="line-height: 1.2;"><span style="color: #ffffff"><div style="text-align: center;">Добавляйтесь в нашу группу<br> ПЛАГИНЫ БЕЗ ЦЕНЗУРЫ</br><span style="color: #f3d900">@lampa_plugins_uncensored</span></span></div></div></div></div>'	

/* Регулярно вызываемые функции */
	Lampa.Storage.set('needReboot', false);
	Lampa.Storage.set('needRebootSettingExit', false);
/* Запрос на перезагрузку в модальном окне */
function showReload(reloadText){
Lampa.Modal.open({
      title: '',
      align: 'center',
      zIndex: 300,
      html: $('<div class="about">' + reloadText + '</div>'),
      buttons: [{
        name: 'Нет',
        onSelect: function onSelect() {
         //Lampa.Modal.close();
          $('.modal').remove();
	  Lampa.Controller.toggle('content')
        }
      }, {
        name: 'Да',
        onSelect: function onSelect() {
          window.location.reload();
        }
      }]
});
}


/* Функция анимации установки плагина */	
function showLoadingBar() {
  // Создаем элемент для полосы загрузки
  var loadingBar = document.createElement('div');
  loadingBar.className = 'loading-bar';
  loadingBar.style.position = 'fixed';
  loadingBar.style.top = '50%';
  loadingBar.style.left = '50%';
  loadingBar.style.transform = 'translate(-50%, -50%)'; // Центрируем по центру
  loadingBar.style.zIndex = '9999';
  loadingBar.style.display = 'none';
  loadingBar.style.width = '30em';
  loadingBar.style.height = '2.5em'; 
  loadingBar.style.backgroundColor = '#595959';
  loadingBar.style.borderRadius = '4em';

  // Создаем элемент для индикатора загрузки
  var loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.style.position = 'absolute';
  loadingIndicator.style.left = '0';
  loadingIndicator.style.top = '0';
  loadingIndicator.style.bottom = '0';
  loadingIndicator.style.width = '0';
  loadingIndicator.style.backgroundColor = '#64e364';
  loadingIndicator.style.borderRadius = '4em';

  // Создаем элемент для отображения процента загрузки
  var loadingPercentage = document.createElement('div');
  loadingPercentage.className = 'loading-percentage';
  loadingPercentage.style.position = 'absolute';
  loadingPercentage.style.top = '50%';
  loadingPercentage.style.left = '50%';
  loadingPercentage.style.transform = 'translate(-50%, -50%)';
  loadingPercentage.style.color = '#fff';
  loadingPercentage.style.fontWeight = 'bold';
  loadingPercentage.style.fontSize = '1.7em';

  // Добавляем элементы на страницу
  loadingBar.appendChild(loadingIndicator);
  loadingBar.appendChild(loadingPercentage);
  document.body.appendChild(loadingBar);

  // Отображаем полосу загрузки
  loadingBar.style.display = 'block';

  // Анимация с использованием setTimeout
  var startTime = Date.now();
  var duration = 1000; // 1 секунда
  var interval = setInterval(function() {
  var elapsed = Date.now() - startTime;
  var progress = Math.min((elapsed / duration) * 100, 100);

    loadingIndicator.style.width = progress + '%';
    loadingPercentage.textContent = Math.round(progress) + '%';

    if (elapsed >= duration) {
      clearInterval(interval);
      setTimeout(function() {
        loadingBar.style.display = 'none';
        loadingBar.parentNode.removeChild(loadingBar);
      }, 250);
    }
  }, 16);
}

/* Функция анимации удаления плагина */	
function showDeletedBar() {
  // Создаем элемент для полосы загрузки
  var loadingBar = document.createElement('div');
  loadingBar.className = 'loading-bar';
  loadingBar.style.position = 'fixed';
  loadingBar.style.top = '50%';
  loadingBar.style.left = '50%';
  loadingBar.style.transform = 'translate(-50%, -50%)'; // Центрируем по центру
  loadingBar.style.zIndex = '9999';
  loadingBar.style.display = 'none';
  loadingBar.style.width = '30em';
  loadingBar.style.height = '2.5em';
  loadingBar.style.backgroundColor = '#595959';
  loadingBar.style.borderRadius = '4em';

  // Создаем элемент для индикатора загрузки
  var loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.style.position = 'absolute';
  loadingIndicator.style.left = '0';
  loadingIndicator.style.top = '0';
  loadingIndicator.style.bottom = '0';
  loadingIndicator.style.width = '0';
  loadingIndicator.style.backgroundColor = '#ff2121';
  loadingIndicator.style.borderRadius = '4em';

  // Создаем элемент для отображения процента загрузки
  var loadingPercentage = document.createElement('div');
  loadingPercentage.className = 'loading-percentage';
  loadingPercentage.style.position = 'absolute';
  loadingPercentage.style.top = '50%';
  loadingPercentage.style.left = '50%';
  loadingPercentage.style.transform = 'translate(-50%, -50%)';
  loadingPercentage.style.color = '#fff';
  loadingPercentage.style.fontWeight = 'bold';
  loadingPercentage.style.fontSize = '1.7em';

  // Добавляем элементы на страницу
  loadingBar.appendChild(loadingIndicator);
  loadingBar.appendChild(loadingPercentage);
  document.body.appendChild(loadingBar);

  // Отображаем полосу загрузки
  loadingBar.style.display = 'block';

  // Анимация с использованием setTimeout
  var startTime = Date.now();
  var duration = 1000; // 1 секунда
  var interval = setInterval(function() {
  var elapsed = Date.now() - startTime;
  var progress = 100 - Math.min((elapsed / duration) * 100, 100);

    loadingIndicator.style.width = progress + '%';
    loadingPercentage.textContent = Math.round(progress) + '%';

    if (elapsed >= duration) {
      clearInterval(interval);
      setTimeout(function() {
        loadingBar.style.display = 'none';
        loadingBar.parentNode.removeChild(loadingBar);
      }, 250);
    }
  }, 16);
}
	
/* Следим за настройками */
function settingsWatch() {
	/* проверяем флаг перезагрузки и ждём выхода из настроек */
	if (Lampa.Storage.get('needRebootSettingExit')) {
  		var intervalSettings = setInterval(function() {
  			var elementSettings = $('#app > div.settings > div.settings__content.layer--height > div.settings__body > div');
  			if (!elementSettings.length > 0){
    				clearInterval(intervalSettings);
				showReload('Для полного удаления плагина перезагрузите приложение!');
  			}
		}, 1000)
	}
}
/* Способ от Lampac -->
function itemON(sourceURL, sourceName) {
                   var script = document.createElement ('script');
                   script.src = sourceURL;
                   document.getElementsByTagName ('head')[0].appendChild (script);
			setTimeout(function() {
			   Lampa.Settings.update();
			   Lampa.Noty.show("Плагин " + sourceName + " успешно установлен")
			}, 300);
};
--> */

function itemON(sourceURL, sourceName, sourceAuthor, itemName) {
//if ($('DIV[data-name="' + itemName + '"]').find('.settings-param__status').hasClass('active')) {Lampa.Noty.show("Плагин уже установлен!")} else {	
if ($('DIV[data-name="' + itemName + '"]').find('.settings-param__status').hasClass('active')) {
  Lampa.Noty.show("Плагин уже установлен!");
} else if ($('DIV[data-name="' + itemName + '"]').find('.settings-param__status').css('background-color') === 'rgb(255, 165, 0)') {
  Lampa.Noty.show("Плагин уже установлен, но отключен в расширениях!");
} else {	
	// Если перезагрузки не требуется - контроль после удаления плагинов
   if (!Lampa.Storage.get('needReboot')) {
	// Получаем список плагинов
		var pluginsArray = Lampa.Storage.get('plugins');
	// Добавляем новый элемент к списку
		pluginsArray.push({
			"author": sourceAuthor,
			"url": sourceURL,
			"name": sourceName,
			"status": 1
		});
	// Внедряем изменённый список в лампу
		Lampa.Storage.set('plugins', pluginsArray);
	// Делаем инъекцию скрипта для немедленной работы
		var script = document.createElement ('script');
		script.src = sourceURL;
		document.getElementsByTagName ('head')[0].appendChild (script);
		/*setTimeout(function() {
			Lampa.Settings.update();
			Lampa.Noty.show("Плагин " + sourceName + " успешно установлен")
		}, 300);*/
	        showLoadingBar();
	          setTimeout(function() {
			Lampa.Settings.update();
			Lampa.Noty.show("Плагин " + sourceName + " успешно установлен")
		  }, 1500);
// Отправляем сигнал ожидания выхода из настроек для появления окна с предложением перезагрузки
	  // Lampa.Storage.set('needRebootSettingExit', true);
	  // settingsWatch();
   } //else {showReload('Для установки плагинов после удаления, нужно перезагрузить приложение');}
}
}	
function hideInstall() {
	$("#hideInstall").remove();
	$('body').append('<div id="hideInstall"><style>div.settings-param__value{opacity: 0%!important;display: none;}</style><div>')
}

function deletePlugin(pluginToRemoveUrl) {
	var plugins = Lampa.Storage.get('plugins');
	var updatedPlugins = plugins.filter(function(obj) {return obj.url !== pluginToRemoveUrl});
	Lampa.Storage.set('plugins', updatedPlugins);
	//Lampa.Storage.set('needReboot', true);
	setTimeout(function() {
	  Lampa.Settings.update();
	  Lampa.Noty.show("Плагин успешно удален");
	}, 1500);
	/*Lampa.Settings.update();
	Lampa.Noty.show("Плагин успешно удален");*/
	Lampa.Storage.set('needRebootSettingExit', true);
	   settingsWatch();
	   showDeletedBar();
};

function checkPlugin(pluginToCheck) {
	var plugins = Lampa.Storage.get('plugins');
	var checkResult = plugins.filter(function(obj) {return obj.url == pluginToCheck});
	console.log('search', 'checkResult: ' + JSON.stringify(checkResult));
	console.log('search', 'pluginToCheck: ' + pluginToCheck);
	if (JSON.stringify(checkResult) !== '[]') {return true} else {return false}
};
	
/* Компонент */
Lampa.SettingsApi.addComponent({
            component: 'add_plugin',
            name: 'Плагины',
            icon: icon_add_plugin
       });
/* Интерфейс */
        Lampa.Settings.listener.follow('open', function (e) {
            if (e.name == 'main') {
                Lampa.SettingsApi.addComponent({
                    component: 'add_interface_plugin',
                    name: 'Interface'
				});
				setTimeout(function() {
					$('div[data-component="add_interface_plugin"]').remove();
					$('div[data-component="add_management_plugin"]').remove();
					$('div[data-component="add_online_plugin"]').remove();
					$('div[data-component="add_torrent_plugin"]').remove();
					$('div[data-component="add_tv_plugin"]').remove();
					$('div[data-component="add_music_plugin"]').remove();
					$('div[data-component="add_radio_plugin"]').remove();
					$('div[data-component="add_sisi_plugin"]').remove();
					$('div[data-component="pirate_store"]').remove();
				}, 0);
				$("#hideInstall").remove();
				//$('body').append('<div id="hideInstall"><style>div.settings-param__value{opacity: 0%!important;display: none;}</style><div>')
		                /* Сдвигаем раздел выше */
				        setTimeout(function() {
					  $('div[data-component=plugins]').before($('div[data-component=add_plugin]'))
					}, 30)
			}
		});

		Lampa.SettingsApi.addParam({
					component: 'add_plugin',
					param: {
						name: 'add_interface_plugin',
						type: 'static',
						default: true
                         },
					field: {
						name: icon_add_interface_plugin
                        },
					onRender: function(item) {
					item.on('hover:enter', function () {
						Lampa.Settings.create('add_interface_plugin');
						Lampa.Controller.enabled().controller.back = function(){
							Lampa.Settings.create('add_plugin');
						}
                            });
					}
		});
		
		Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'TMDB',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
                    			//default: '1',
						},
					field: {
						name: 'TMDB Proxy',
						description: 'Проксирование постеров для сайта TMDB'
                            },
					onChange: function(value) {
						if (value == '1') {
							itemON('https://bylampa.github.io/tmdb-proxy.js', 'TMDB Proxy', '@lampa', 'TMDB');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/tmdb-proxy.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {
						$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://cub.red/plugin/tmdb-proxy')
						setTimeout(function() {	
							$('div[data-name="TMDB"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="TMDB"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="TMDB"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/tmdb-proxy.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="TMDB"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/tmdb-proxy.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="TMDB"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="TMDB"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="TMDB"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
       
		Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'Feedback',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Отзывы',
						description: 'Добавляет в карточке кнопку с отзывами'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('http://newtv.mail66.org/o.js', 'Отзывы', '@elenatv99', 'Feedback');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://newtv.mail66.org/o.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('http://newtv.mail66.org/o.js')
						setTimeout(function() {	
							$('div[data-name="Feedback"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Feedback"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Feedback"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://newtv.mail66.org/o.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Feedback"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://newtv.mail66.org/o.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Feedback"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Feedback"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Feedback"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
       
		Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'Tricks',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Приятные мелочи',
						description: 'Плагин позволяет на выбор установить различные дополнения (скринсейверы, стилизация кнопок, стиль плеера, часы в плеере и т.п.)'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://andreyurl54.github.io/diesel5/tricks.js', 'Приятные Мелочи', '@AndreyURL54', 'Tricks');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://andreyurl54.github.io/diesel5/tricks.js";
							deletePlugin(pluginToRemoveUrl);
						}	
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900');  hideInstall()
						/*var myResult = checkPlugin('https://andreyurl54.github.io/diesel5/tricks.js')
						setTimeout(function() {	
							$('div[data-name="Tricks"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Tricks"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Tricks"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://andreyurl54.github.io/diesel5/tricks.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Tricks"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://andreyurl54.github.io/diesel5/tricks.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Tricks"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Tricks"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Tricks"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
		
		Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'Rating',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Рейтинг КиноПоиск и IMDB',
						description: 'Показ рейтинга КиноПоиск и IMDB в карточке. Функционал аналогичен части из MODSs, так что их не следует использовать вместе'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://nb557.github.io/plugins/rating.js', 'Рейтинг КиноПоиск и IMDB', '@t_anton', 'Rating');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://nb557.github.io/plugins/rating.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://nb557.github.io/plugins/rating.js')
						setTimeout(function() {	
							$('div[data-name="Rating"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Rating"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Rating"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://nb557.github.io/plugins/rating.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Rating"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://nb557.github.io/plugins/rating.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Rating"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Rating"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Rating"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'Want',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Старый стиль пунктов (Закладки, Нравится, Позже)',
						description: 'Плагин возвращает в главное меню старый стиль отображения пунктов (Закладки, Нравится, Позже)'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('http://github.freebie.tom.ru/want.js', 'Старый Стиль Пунктов (Закладки, Нравится, Позже)', '@VitalikPVA', 'Want');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://github.freebie.tom.ru/want.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('http://github.freebie.tom.ru/want.js')
						setTimeout(function() {	
							$('div[data-name="Want"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Want"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Want"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://github.freebie.tom.ru/want.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Want"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://github.freebie.tom.ru/want.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Want"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Want"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Want"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'Sub_reset',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Сброс настроек субтитров',
						description: 'Плагин сбрасывает настройки субтитров по умолчанию'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://nb557.github.io/plugins/reset_subs.js', 'Сброс Настроек Субтитров', '@t_anton', 'Sub_reset');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://nb557.github.io/plugins/reset_subs.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://nb557.github.io/plugins/reset_subs.js')
						setTimeout(function() {	
							$('div[data-name="Sub_reset"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Sub_reset"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Sub_reset"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://nb557.github.io/plugins/reset_subs.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Sub_reset"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://nb557.github.io/plugins/reset_subs.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Sub_reset"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Sub_reset"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Sub_reset"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	         Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'Mult',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Мультфильмы',
						description: 'Плагин заменяет пункт Аниме на Мульт'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('http://193.233.134.21/plugins/mult.js', 'Мультфильмы', '@AndreyURL54', 'Mult');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://193.233.134.21/plugins/mult.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('http://193.233.134.21/plugins/mult.js')
						setTimeout(function() {	
							$('div[data-name="Mult"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Mult"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Mult"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://193.233.134.21/plugins/mult.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Mult"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://193.233.134.21/plugins/mult.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Mult"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Mult"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Mult"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'Collections',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Коллекции',
						description: 'Обнаружьте захватывающие коллекции фильмов и сериалов в главном меню приложения. От новинок до классики — каждая коллекция это увлекательное погружение в мир киноискусства'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://cub.red/plugin/collections', 'Коллекции', '@lampa', 'Collections');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://cub.red/plugin/collections";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://cub.red/plugin/collections')
						setTimeout(function() {	
							$('div[data-name="Collections"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Collections"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Collections"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://cub.red/plugin/collections');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Collections"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://cub.red/plugin/collections') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Collections"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Collections"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Collections"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'Weather',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Погода',
						description: 'Плагин будет поочередно показывать время и погоду, чередуя их показания'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/weather.js', 'Погода', '@scabrum', 'Weather');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/weather.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/weather.js')
						setTimeout(function() {	
							$('div[data-name="Weather"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/weather.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Weather"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/weather.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'Cub_off',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Cub Off',
						description: 'Плагин убирает элементы, предлагающие оформить cub premium'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/cub_off.js', 'Cub Off', '@scabrum', 'Cub_off');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/cub_off.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/cub_off.js')
						setTimeout(function() {	
							$('div[data-name="Cub_off"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Cub_off"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Cub_off"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/cub_off.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Cub_off"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/cub_off.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Cub_off"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Cub_off"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Cub_off"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'Style_interface_fix',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Стильный интерфейс',
						description: 'Новый стильный интерфейс для каталога TMDB и CUB. Понравится тем, кому нравится интерфейс в кинопоиске или netflix'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/interface.js', 'Стильный Интерфейс', '@lampa', 'Style_interface_fix');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/interface.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/interface.js')
						setTimeout(function() {	
							$('div[data-name="Style_interface_fix"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Style_interface_fix"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Style_interface_fix"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/interface.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Style_interface_fix"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/interface.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Style_interface_fix"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Style_interface_fix"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Style_interface_fix"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'New_cat',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Дополнительные категории',
						description: 'Плагин позволяет добавить на выбор в главное меню категории (Документалки, Концерты и Мультфильмы)'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://lampame.github.io/main/nc/nc.js', 'Дополнительные Категории', '@GwynnBleiidd', 'New_cat');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://lampame.github.io/main/nc/nc.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://lampame.github.io/main/nc/nc.js')
						setTimeout(function() {	
							$('div[data-name="New_cat"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="New_cat"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="New_cat"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://lampame.github.io/main/nc/nc.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="New_cat"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://lampame.github.io/main/nc/nc.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="New_cat"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="New_cat"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="New_cat"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'New_source',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Дополнительные источники',
						description: 'Плагин добавляет дополнительные источники для получения информации о фильмах'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/source.js', 'Дополнительные Источники', '@scabrum', 'New_source');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/source.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/source.js')
						setTimeout(function() {	
							$('div[data-name="New_source"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="New_source"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="New_source"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/source.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="New_source"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/source.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="New_source"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="New_source"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="New_source"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	        Lampa.SettingsApi.addParam({
	        			component: 'add_interface_plugin',
					param: {
						name: 'Start',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Start',
						description: 'Плагин позволяет заходить на заблокированные карточки'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/start.js', 'Start', '@scabrum', 'Start');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/start.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/start.js')
						setTimeout(function() {	
							$('div[data-name="Start"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Start"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Start"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/start.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Start"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/start.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Start"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Start"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Start"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		  });
	          Lampa.SettingsApi.addParam({
						component: 'add_interface_plugin',
						param: {
							name: 'goldtheme',
							type: 'select',
							values: {
								1:	'Установить',
								2:	'Удалить',
							},
						//default: '1',
							},
						field: {
							name: 'Золотая тема',
							description: 'Плагин включает золотую тему'
						},
						onChange: function(value) {
							if (value == '1') {
								itemON('https://bazzzilius.github.io/scripts/gold_theme.js', 'Золотая Тема', '@BazZziliuS', 'goldtheme');
							}
							if (value == '2') {
								var pluginToRemoveUrl = "https://bazzzilius.github.io/scripts/gold_theme.js";
								deletePlugin(pluginToRemoveUrl);
							}
						},
						onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
							/*var myResult = checkPlugin('https://bazzzilius.github.io/scripts/gold_theme.js')
							setTimeout(function() {	
								$('div[data-name="goldtheme"]').append('<div class="settings-param__status one"></div>')
								if (myResult) {
									$('div[data-name="goldtheme"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
								} else {
									$('div[data-name="goldtheme"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
								}
							}, 100);*/
						var myResult = checkPlugin('https://bazzzilius.github.io/scripts/gold_theme.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="goldtheme"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bazzzilius.github.io/scripts/gold_theme.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="goldtheme"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="goldtheme"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="goldtheme"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
						}
		});
	        Lampa.SettingsApi.addParam({
						component: 'add_interface_plugin',
						param: {
							name: 'concert_search',
							type: 'select',
							values: {
								1:	'Установить',
								2:	'Удалить',
							},
						//default: '1',
							},
						field: {
							name: 'Поиск концертов',
							description: 'Плагин осуществляет поиск концертов через парсер Jackett'
						},
						onChange: function(value) {
							if (value == '1') {
								itemON('https://lampame.github.io/main/cts.js', 'Поиск Концертов', '@GwynnBleiidd', 'concert_search');
							}
							if (value == '2') {
								var pluginToRemoveUrl = "https://lampame.github.io/main/cts.js";
								deletePlugin(pluginToRemoveUrl);
							}
						},
						onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
							/*var myResult = checkPlugin('https://lampame.github.io/main/cts.js')
							setTimeout(function() {	
								$('div[data-name="concert_search"]').append('<div class="settings-param__status one"></div>')
								if (myResult) {
									$('div[data-name="concert_search"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
								} else {
									$('div[data-name="concert_search"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
								}
							}, 100);*/
						var myResult = checkPlugin('https://lampame.github.io/main/cts.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="concert_search"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://lampame.github.io/main/cts.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="concert_search"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="concert_search"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="concert_search"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
						}
		});
	       
	        Lampa.SettingsApi.addParam({
						component: 'add_interface_plugin',
						param: {
							name: 'Rezka_comments',
							type: 'select',
							values: {
								1:	'Установить',
								2:	'Удалить',
							},
						//default: '1',
							},
						field: {
							name: 'Комментарии от Rezka',
							description: 'Плагин выводит комментарии к фильму от сервиса Rezka'
						},
						onChange: function(value) {
							if (value == '1') {
								itemON('https://BDVBurik.github.io/rezkacommentwo.js', 'Комментарии Rezka', '@BDV_Burik', 'Rezka_comments');
							}
							if (value == '2') {
								var pluginToRemoveUrl = "https://BDVBurik.github.io/rezkacommentwo.js";
								deletePlugin(pluginToRemoveUrl);
							}
						},
						onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
							/*var myResult = checkPlugin('https://BDVBurik.github.io/rezkacommentwo.js')
							setTimeout(function() {	
								$('div[data-name="Rezka_comments"]').append('<div class="settings-param__status one"></div>')
								if (myResult) {
									$('div[data-name="Rezka_comments"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
								} else {
									$('div[data-name="Rezka_comments"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
								}
							}, 100);*/
						var myResult = checkPlugin('https://BDVBurik.github.io/rezkacommentwo.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Rezka_comments"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://BDVBurik.github.io/rezkacommentwo.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Rezka_comments"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Rezka_comments"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Rezka_comments"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
						}
		});

                Lampa.SettingsApi.addParam({
						component: 'add_interface_plugin',
						param: {
							name: 'Shikimori',
							type: 'select',
							values: {
								1:	'Установить',
								2:	'Удалить',
							},
						//default: '1',
							},
						field: {
							name: 'LME Shikimori',
							description: 'Отображает информацию по аниме с Shikimori, так же пытается найти по оригинальному названию на ТМДБ, если найдено множество результато, то покажет меню с выбором'
						},
						onChange: function(value) {
							if (value == '1') {
								itemON('https://lampame.github.io/main/shikimori.js', 'LME Shikimori', '@GwynnBleiidd', 'Shikimori');
							}
							if (value == '2') {
								var pluginToRemoveUrl = "https://lampame.github.io/main/shikimori.js";
								deletePlugin(pluginToRemoveUrl);
							}
						},
						onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
							/*var myResult = checkPlugin('')
							setTimeout(function() {	
								$('div[data-name="Shikimori"]').append('<div class="settings-param__status one"></div>')
								if (myResult) {
									$('div[data-name="Shikimori"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
								} else {
									$('div[data-name="Shikimori"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
								}
							}, 100);*/
						var myResult = checkPlugin('https://lampame.github.io/main/shikimori.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Shikimori"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://lampame.github.io/main/shikimori.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Shikimori"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Shikimori"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Shikimori"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
						}
		});

	        Lampa.SettingsApi.addParam({
						component: 'add_interface_plugin',
						param: {
							name: 'ts_del',
							type: 'select',
							values: {
								1:	'Установить',
								2:	'Удалить',
							},
						//default: '1',
							},
						field: {
							name: 'Remove TS',
							description: 'Плагин убирает на главном экране карточки с качеством TS'
						},
						onChange: function(value) {
							if (value == '1') {
								itemON('http://193.233.134.21/plugins/nots', 'Remove TS', '@AndreyURL54', 'ts_del');
							}
							if (value == '2') {
								var pluginToRemoveUrl = "http://193.233.134.21/plugins/nots";
								deletePlugin(pluginToRemoveUrl);
							}
						},
						onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
							/*var myResult = checkPlugin('')
							setTimeout(function() {	
								$('div[data-name="ts_del"]').append('<div class="settings-param__status one"></div>')
								if (myResult) {
									$('div[data-name="ts_del"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
								} else {
									$('div[data-name="ts_del"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
								}
							}, 100);*/
						var myResult = checkPlugin('http://193.233.134.21/plugins/nots');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="ts_del"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://193.233.134.21/plugins/nots') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="ts_del"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="ts_del"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="ts_del"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
						}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'rus_movie',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Русские новинки',
						description: 'Плагин добавляет в левом меню пункт с русскими новинками фильмов и сериалов общим списком и отсортированных по онлайн кинотеатрам'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/rus_movie.js', 'Русские Новинки', '@bylampa', 'rus_movie');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/rus_movie.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/weather.js')
						setTimeout(function() {	
							$('div[data-name="Weather"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/rus_movie.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="rus_movie"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/rus_movie.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="rus_movie"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="rus_movie"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="rus_movie"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'in_qual',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'В качестве',
						description: 'Плагин добавляет в левом меню пункт с фильмами, которые вышли в высоком качестве'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/in_quality.js', 'В Качестве', '@bylampa', 'in_qual');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/in_quality.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/weather.js')
						setTimeout(function() {	
							$('div[data-name="Weather"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/in_quality.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="in_qual"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/in_quality.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="in_qual"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="in_qual"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="in_qual"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});

	         Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'snow',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Снег',
						description: 'Плагин включает анмацию падающего снега (в настройках пункта интерфейс можно вкл/откл её)'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/snow.js', 'Снег', '@bylampa', 'snow');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/snow.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/weather.js')
						setTimeout(function() {	
							$('div[data-name="Weather"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/snow.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="snow"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/snow.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="snow"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="snow"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="snow"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'logo_title',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Лого вместо названия',
						description: 'Позволяет заменить в карточке название фильма/сериала и т.д. на логотип. В настройках приложения в разделе интерфейс можно откл/вкл показ'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/logo_title.js', 'Лого Вместо Названия', '@bylampa', 'logo_title');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/logo_title.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/logo_title.js')
						setTimeout(function() {	
							$('div[data-name="Weather"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/logo_title.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="logo_title"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/logo_title.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="logo_title"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="logo_title"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="logo_title"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'trakt',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'TraktTV',
						description: 'Плагин Trakt.TV позволяет пользователям получать контент из Trakt.TV прямо в приложении Lampa. С его помощью можно авторизоваться, просматривать список UpNext и Watchlist, а также обновлять токены авторизации'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://lampame.github.io/main/trakttv.js', 'TraktTV', '@lme', 'trakt');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://lampame.github.io/main/trakttv.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/logo_title.js')
						setTimeout(function() {	
							$('div[data-name="Weather"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://lampame.github.io/main/trakttv.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="trakt"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://lampame.github.io/main/trakttv.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="trakt"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="trakt"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="trakt"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'head_filter',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Настройка шапки',
						description: 'Добавляет возможность скрыть элементы в шапке приложения'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://and7ey.github.io/lampa/head_filter.js', 'Настройка Шапки', '@and7ey', 'head_filter');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://and7ey.github.io/lampa/head_filter.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/logo_title.js')
						setTimeout(function() {	
							$('div[data-name="Weather"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://and7ey.github.io/lampa/head_filter.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="head_filter"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://and7ey.github.io/lampa/head_filter.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="head_filter"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="head_filter"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="head_filter"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'cardify',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Cardify',
						description: 'Плагин преобразует привычный вид карточек, предлагая обновленный интерфейс — более яркий, красочный и привлекательный'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/cardify.js', 'Cardify', '@lampa', 'cardify');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/cardify.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/logo_title.js')
						setTimeout(function() {	
							$('div[data-name="Weather"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/cardify.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="cardify"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/cardify.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="cardify"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="cardify"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="cardify"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'back_menu',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Меню выход',
						description: 'Плагин подменяет меню выхода из приложения на свое со своими пунктами, которые можно включать или отключать в настройках приложения (раздел остальное, пункт Меню Выход)'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/backmenu.js', 'Меню Выход', '@bylampa', 'back_menu');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/backmenu.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/logo_title.js')
						setTimeout(function() {	
							$('div[data-name="Weather"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/backmenu.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="back_menu"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/backmenu.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="back_menu"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="back_menu"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="back_menu"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'my_themes',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Мои темы',
						description: 'Плагин изменяет палитру элементов приложения. Для установки темы нужно зайти в настройки интерфейса приложения и выбрать пункт Мои Темы. Чтобы вернуться на стандартный интерфейс достаточно удалить любую из тем'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/themes.js', 'Мои Темы', '@bylampa', 'my_themes');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/themes.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/logo_title.js')
						setTimeout(function() {	
							$('div[data-name="Weather"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/themes.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="my_themes"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/themes.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="my_themes"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="my_themes"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="my_themes"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_interface_plugin',
					param: {
						name: 'inter_movie',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Зарубежные подборки',
						description: 'Плагин добавляет в левом меню пункт с зарубежными подборками'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/inter_movie.js', 'Зарубежные Подборки', '@bylampa', 'inter_movie');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/inter_movie.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
			                onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall()
						/*var myResult = checkPlugin('https://bylampa.github.io/weather.js')
						setTimeout(function() {	
							$('div[data-name="Weather"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Weather"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/inter_movie.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="inter_movie"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/inter_movie.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="inter_movie"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="inter_movie"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="inter_movie"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});

	
	      /*  Lampa.SettingsApi.addParam({
                                  component: 'add_interface_plugin',
                                  param: {
                                         name: 'Reboot_interface_plugin',
                                         type: 'static',
                                  },
                                  field: {
                                         name: '<div class="settings-folder" style="padding:0!important"><div style="display: block; margin: 0 auto;height:2.3em;padding-right:.1em"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g style="fill:none;stroke:#ffffff;stroke-width:12px;stroke-linecap:round;stroke-linejoin:round;"> <path d="m 50,10 0,35"></path> <path d="M 20,29 C 4,52 15,90 50,90 85,90 100,47 74,20"></path> </g> <path style="fill:#ffffff;" d="m 2,21 29,-2 2,29"></path> </g></svg></div></div>',
					 description: '<div style="text-align: center;">Нажмите для перезагрузки Lampa</div>',
	                           },
                                   onRender: function (item) {
                                      item.on('hover:enter', function(){
                                         location.reload();
                                      });
                                   }
	        });*/
	        

        Lampa.Settings.listener.follow('open', function (e) {
					if (e.name == 'main') {
						Lampa.SettingsApi.addComponent({
							component: 'add_management_plugin',
							name: 'Management'
						});
					}
		});
/* Управление */
		Lampa.SettingsApi.addParam({
					component: 'add_plugin',
					param: {
						name: 'add_management_plugin',
      		                        	type: 'static',
						default: true
                        		},
					field: {
                                name: icon_add_management_plugin
                        },
					onRender: function(item) {
						item.on('hover:enter', function () {
							Lampa.Settings.create('add_management_plugin');
							Lampa.Controller.enabled().controller.back = function(){
								Lampa.Settings.create('add_plugin');
							}
						});
					}
		});
       
		Lampa.SettingsApi.addParam({
					component: 'add_management_plugin',
					param: {
                               		name: 'Exit_Menu',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
                                    name: 'Выход',
                                    description: 'Плагин добавляет пункт Выход в главное меню'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://tsynik.github.io/lampa/e.js', 'Выход', '@tsynik', 'Exit_Menu');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://tsynik.github.io/lampa/e.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://tsynik.github.io/lampa/e.js')
						setTimeout(function() {	
							$('div[data-name="Exit_Menu"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Exit_Menu"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Exit_Menu"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://tsynik.github.io/lampa/e.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Exit_Menu"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://tsynik.github.io/lampa/e.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Exit_Menu"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Exit_Menu"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Exit_Menu"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
       
		Lampa.SettingsApi.addParam({
					component: 'add_management_plugin',
					param: {
						name: 'New_Version',
						type: 'select',																																		
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Проверка новой версии',
						description: 'Проверяет наличие новой версии приложения на Android TV от Nemiroff (в данный момент не поддерживается)'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://nemiroff.github.io/lampa/updater.js', 'Проверка Новой Версии', '@nemiroff', 'New_Version');
							}
						if (value == '2') {
							var pluginToRemoveUrl = "https://nemiroff.github.io/lampa/updater.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://nemiroff.github.io/lampa/updater.js')
						setTimeout(function() {	
							$('div[data-name="New_Version"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="New_Version"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="New_Version"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://nemiroff.github.io/lampa/updater.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="New_Version"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://nemiroff.github.io/lampa/updater.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="New_Version"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="New_Version"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="New_Version"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
       
		Lampa.SettingsApi.addParam({
					component: 'add_management_plugin',
					param: {
                               			name: 'Hot_Buttons',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
					},
                            		field: {
                                    		name: 'Горячие кнопки',
                                    		description: 'Плагин вызывает меню плеера лампы по кнопкам пульта: 5 - плейлист, 8 - аудиодорожки, 0 - субтитры, channel+/- следующий/предыдущий файл в плейлисте'
                            		},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://nnmdd.github.io/lampa_hotkeys/hotkeys.js', 'Горячие Кнопки', '@nnmd', 'Hot_Buttons');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://nnmdd.github.io/lampa_hotkeys/hotkeys.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://nnmdd.github.io/lampa_hotkeys/hotkeys.js')
						setTimeout(function() {	
							$('div[data-name="Hot_Buttons"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Hot_Buttons"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Hot_Buttons"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://nnmdd.github.io/lampa_hotkeys/hotkeys.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Hot_Buttons"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://nnmdd.github.io/lampa_hotkeys/hotkeys.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Hot_Buttons"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Hot_Buttons"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Hot_Buttons"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
       
		Lampa.SettingsApi.addParam({
					component: 'add_management_plugin',
					param: {
						name: 'DLNA',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
                                    		name: 'DLNA (Tizen, Orsay)',
                                    		description: 'Плагин работает на устройстве Orsay, для Tizen необходимо обновить виджет до версии 1.9.1'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('http://cub.red/plugin/dlna', 'DLNA', '@lampa', 'DLNA');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://cub.red/plugin/dlna";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://cub.red/plugin/dlna')
						setTimeout(function() {	
							$('div[data-name="DLNA"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="DLNA"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="DLNA"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://cub.red/plugin/dlna');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="DLNA"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://cub.red/plugin/dlna') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="DLNA"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="DLNA"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="DLNA"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_management_plugin',
					param: {
						name: 'Select_Weapon',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
                                    		name: 'Тип управления',
                                    		description: 'Плагин при установке позволяет выбрать тип управления (Пульт без мышки, Пульт с мышью, Тачскрин), а так же сбросить тип управления выбранный ранее'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://nemiroff.github.io/lampa/select_weapon.js', 'Тип Управления', '@nemiroff', 'Select_Weapon');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://nemiroff.github.io/lampa/select_weapon.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://nemiroff.github.io/lampa/select_weapon.js')
						setTimeout(function() {	
							$('div[data-name="Select_Weapon"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Select_Weapon"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Select_Weapon"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://nemiroff.github.io/lampa/select_weapon.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Select_Weapon"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://nemiroff.github.io/lampa/select_weapon.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Select_Weapon"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Select_Weapon"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Select_Weapon"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_management_plugin',
					param: {
						name: 'Touch_off',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
                                    		name: 'Выключение тача',
                                    		description: 'Плагин выключает сенсорное управление, если оно было включено по ошибке'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://nb557.github.io/plugins/not_mobile.js', 'Выключение Тача', '@t_anton', 'Touch_off');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://nb557.github.io/plugins/not_mobile.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://nb557.github.io/plugins/not_mobile.js')
						setTimeout(function() {	
							$('div[data-name="Touch_off"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Touch_off"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Touch_off"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://nb557.github.io/plugins/not_mobile.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Touch_off"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://nb557.github.io/plugins/not_mobile.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Touch_off"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Touch_off"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Touch_off"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_management_plugin',
					param: {
						name: 'Wsoff',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
                                    		name: 'Wsoff',
                                    		description: 'Плагин отключения ошибки (Request was denied for security) на старых версиях Android.Не устанавливать, если ошибки нет'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('http://plugin.rootu.top/wsoff.js', 'Wsoff', '@rootu', 'Wsoff');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://plugin.rootu.top/wsoff.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://plugin.rootu.top/wsoff.js')
						setTimeout(function() {	
							$('div[data-name="Wsoff"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Wsoff"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Wsoff"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://plugin.rootu.top/wsoff.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Wsoff"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://plugin.rootu.top/wsoff.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Wsoff"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Wsoff"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Wsoff"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_management_plugin',
					param: {
						name: 'Redirect',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
                                    		name: 'Смена сервера',
                                    		description: 'Плагин позволяет сменить сервер приложения'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/redirect.js', 'Смена Сервера', '@scabrum', 'Redirect');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/redirect.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://bylampa.github.io/redirect.js')
						setTimeout(function() {	
							$('div[data-name="Redirect"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Redirect"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Redirect"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/redirect.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Redirect"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/redirect.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Redirect"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Redirect"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Redirect"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	       /* Lampa.SettingsApi.addParam({
					component: 'add_management_plugin',
					param: {
						name: 'Timecode',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
                                    		name: 'Синхронизация таймкодов',
                                    		description: 'Плагин синхронизирует таймкоды между вашими устройствами'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/timecode.js', 'Синхронизация Таймкодов', '@scabrum', 'Timecode');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/timecode.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://bylampa.github.io/timecode.js')
						setTimeout(function() {	
							$('div[data-name="Timecode"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Timecode"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Timecode"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						/*var myResult = checkPlugin('https://bylampa.github.io/timecode.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Timecode"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/timecode.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Timecode"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Timecode"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Timecode"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		}); */
            
	        Lampa.SettingsApi.addParam({
					component: 'add_management_plugin',
					param: {
						name: 'setprotect',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Доступ к настройкам',
						description: 'Плагин закрывает доступ к настройкам через введенный пароль при активации соответствующего пункта в меню настроек родительского контроля'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('http://193.233.134.21/plugins/setprotect', 'Доступ к настройкам', '@AndreyURL54', 'setprotect');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://193.233.134.21/plugins/setprotect";
							deletePlugin(pluginToRemoveUrl);
						}	
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900');  hideInstall()
						/*var myResult = checkPlugin('http://193.233.134.21/plugins/setprotect')
						setTimeout(function() {	
							$('div[data-name="setprotect"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="setprotect"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="setprotect"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://193.233.134.21/plugins/setprotect');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="setprotect"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://193.233.134.21/plugins/setprotect') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="setprotect"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="setprotect"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="setprotect"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_management_plugin',
					param: {
						name: 'Sort_mainmenu',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Сортировка главного меню',
						description: 'Плагин позволяет отредактировать главное меню на свой вкус (скрытие, перемещение пунктов меню). Работает на сенсорных устройствах'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('http://193.233.134.21/plugins/menusort', 'Сортировка Главного Меню', '@AndreyURL54', 'Sort_mainmenu');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://193.233.134.21/plugins/menusort";
							deletePlugin(pluginToRemoveUrl);
						}	
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900');  hideInstall()
						/*var myResult = checkPlugin('http://193.233.134.21/plugins/setprotect')
						setTimeout(function() {	
							$('div[data-name="setprotect"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="setprotect"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="setprotect"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://193.233.134.21/plugins/menusort');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Sort_mainmenu"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://193.233.134.21/plugins/menusort') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Sort_mainmenu"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Sort_mainmenu"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Sort_mainmenu"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_management_plugin',
					param: {
						name: 'bind_but',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
						name: 'Бинд кнопок',
						description: 'Плагин позволяет управлять цветными кнопками с ТВ пульта фильтрами в карточке онлайна или торрентов'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://apxubatop.github.io/lmpPlugs/tvbuttontst.js', 'Бинд Кнопок', '@Juri_Z', 'bind_but');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://apxubatop.github.io/lmpPlugs/tvbuttontst.js";
							deletePlugin(pluginToRemoveUrl);
						}	
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900');  hideInstall()
						/*var myResult = checkPlugin('https://apxubatop.github.io/lmpPlugs/tvbuttontst.js')
						setTimeout(function() {	
							$('div[data-name="bind_but"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="bind_but"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="bind_but"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://apxubatop.github.io/lmpPlugs/tvbuttontst.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="bind_but"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://apxubatop.github.io/lmpPlugs/tvbuttontst.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="bind_but"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="bind_but"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="bind_but"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_management_plugin',
					param: {
						name: 'acc_bylampa',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
                                    		name: 'Аккаунт',
                                    		description: 'Плагин позволяет после авторизации в ТГ боте синхронизировать свои данные между устройствами, а также делать бэкап данных без участия CUB'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://bylampa.github.io/account.js', 'Аккаунт', '@bylampa', 'acc_bylampa');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/account.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://bylampa.github.io/redirect.js')
						setTimeout(function() {	
							$('div[data-name="Redirect"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Redirect"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Redirect"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/account.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="acc_bylampa"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/account.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="acc_bylampa"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="acc_bylampa"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="acc_bylampa"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});

                Lampa.SettingsApi.addParam({
					component: 'add_management_plugin',
					param: {
						name: 'infuse_save',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
						},
					field: {
                                    		name: 'Infuse save',
                                    		description: 'Плагин для сохранения торрентов, через Torrserver в Infuse. Поставляется как есть, настроек нет. Вызывается долгим тапом в списке файлов'
					},
					onChange: function(value) {
						if (value == '1') {
						       itemON('https://lampame.github.io/main/infuseSave.js', 'Infuse Save', '@lme', 'infuse_save');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://lampame.github.io/main/infuseSave.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://bylampa.github.io/redirect.js')
						setTimeout(function() {	
							$('div[data-name="Redirect"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Redirect"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Redirect"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://lampame.github.io/main/infuseSave.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="infuse_save"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://lampame.github.io/main/infuseSave.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="infuse_save"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="infuse_save"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="infuse_save"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
		});
	
	      /*  Lampa.SettingsApi.addParam({
                                  component: 'add_management_plugin',
                                  param: {
                                         name: 'Reboot_management_plugin',
                                         type: 'static',
                                  },
                                  field: {
                                         name: '<div class="settings-folder" style="padding:0!important"><div style="display: block; margin: 0 auto;height:2.3em;padding-right:.1em"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g style="fill:none;stroke:#ffffff;stroke-width:12px;stroke-linecap:round;stroke-linejoin:round;"> <path d="m 50,10 0,35"></path> <path d="M 20,29 C 4,52 15,90 50,90 85,90 100,47 74,20"></path> </g> <path style="fill:#ffffff;" d="m 2,21 29,-2 2,29"></path> </g></svg></div></div>',
					 description: '<div style="text-align: center;">Нажмите для перезагрузки Lampa</div>',
	                           },
                                   onRender: function (item) {
                                      item.on('hover:enter', function(){
                                         location.reload();
                                      });
                                   }
	        });*/

        Lampa.Settings.listener.follow('open', function (e) {
					if (e.name == 'main') {
						Lampa.SettingsApi.addComponent({
							component: 'add_online_plugin',
							name: 'Online'
						});
					}
		});
/* Онлайн */
		Lampa.SettingsApi.addParam({
					component: 'add_plugin',
					param: {
						name: 'add_online_plugin',
						type: 'static',
						default: true
                          		},
					field: {
						name: icon_add_online_plugin
                          		},
					onRender: function(item) {
						item.on('hover:enter', function () {
							Lampa.Settings.create('add_online_plugin');
							Lampa.Controller.enabled().controller.back = function(){
								Lampa.Settings.create('add_plugin');
							}
						});
					}
		});
                 
		/*Lampa.SettingsApi.addParam({
					component: 'add_online_plugin',
					param: {
						name: 'Modss',
						type: 'select',
					values: {
						1:	'Установить',
						2:	'Удалить',
					},
					//default: '1',
					},
					field: {
						name: 'Modss',
						description: 'Плагин позволяет смотреть фильмы и сериалы в онлайн. На выбор доступно 17 балансеров и различные дополнения через меню настроек Modss. VIP 4K можно подключить через телеграм-бота @modssmy_bot'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('http://lampa.stream/modss', 'Modss', '@Nikolai4', 'Modss');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://lampa.stream/modss";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://lampa.stream/modss')
						setTimeout(function() {	
							$('div[data-name="Modss"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Modss"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Modss"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						/*var myResult = checkPlugin('http://lampa.stream/modss');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Modss"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://lampa.stream/modss') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Modss"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Modss"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Modss"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
        });*/
        
		Lampa.SettingsApi.addParam({
					component: 'add_online_plugin',
					param: {
                                		name: 'Online_Mod',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
					},
					//default: '1',
              				},
					field: {
						name: 'Online_Mod',
						description: 'Плагин позволяет смотреть фильмы и сериалы в онлайн. На выбор доступно 7 балансеров'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://nb557.github.io/plugins/online_mod.js', 'Online Mod', '@t_anton', 'Online_Mod');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://nb557.github.io/plugins/online_mod.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://nb557.github.io/plugins/online_mod.js')
						setTimeout(function() {	
							$('div[data-name="Online_Mod"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Online_Mod"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Online_Mod"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://nb557.github.io/plugins/online_mod.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Online_Mod"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://nb557.github.io/plugins/online_mod.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Online_Mod"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Online_Mod"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Online_Mod"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);
					}
        });
        
		Lampa.SettingsApi.addParam({
					component: 'add_online_plugin',
					param: {
                                		name: 'Онлайн_Prestige',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
					},
					//default: '1',
					},
					field: {
						name: 'Онлайн Prestige',
						description: 'Аналог плагина Online от разработчика приложения Lampa, но с новым информативным интерфейсом для просмотра фильмов и сериалов в онлайн'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://bwa.to/plugins/prestige.js', 'Онлайн Prestige', '@lampa', 'Онлайн_Prestige');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bwa.to/plugins/prestige.js";
							deletePlugin(pluginToRemoveUrl);
						}
               },
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://bwa.to/plugins/prestige.js')
						setTimeout(function() {	
							$('div[data-name="Онлайн_Prestige"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Онлайн_Prestige"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Онлайн_Prestige"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bwa.to/plugins/prestige.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Онлайн_Prestige"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bwa.to/plugins/prestige.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Онлайн_Prestige"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Онлайн_Prestige"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Онлайн_Prestige"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);		   
					}
        });
        
		Lampa.SettingsApi.addParam({
					component: 'add_online_plugin',
					param: {
                               			name: 'online_cinema',
                   				type: 'select',
                   				values: {
							1:	'Установить',
							2:	'Удалить',
                   				},
					//default: '1',
               				},
					field: {
                                  		name: 'Онлайн Cinema',
                                  		description: 'Плагин для просмотра фильмов и сериалов в онлайн'
					},
                           		onChange: function(value) {
					if (value == '1') {
						itemON('https://bylampa.github.io/cinema.js', 'Онлайн Cinema', '@cinema', 'online_cinema');
					}
					if (value == '2') {
						var pluginToRemoveUrl = "https://bylampa.github.io/cinema.js";
						deletePlugin(pluginToRemoveUrl);
					}
                },
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://bwa.to/o')
						setTimeout(function() {	
							$('div[data-name="Онлайн_BWA"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Онлайн_BWA"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Онлайн_BWA"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/cinema.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="online_cinema"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/cinema.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="online_cinema"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="online_cinema"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="online_cinema"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_online_plugin',
					param: {
                               			name: 'Онлайн_BWA_Cloud',
                   				type: 'select',
                   				values: {
							1:	'Установить',
							2:	'Удалить',
                   				},
					//default: '1',
               				},
					field: {
                                  		name: 'Онлайн BWA Cloud',
                                  		description: 'Плагин для просмотра фильмов и сериалов в онлайн, менее капризный для работы и более подходит для старых устройств, чем Online BWA'
					},
                           		onChange: function(value) {
					if (value == '1') {
						itemON('http://bwa.to/cloud.js', 'Онлайн BWA Cloud', '@rik', 'Онлайн_BWA_Cloud');
					}
					if (value == '2') {
						var pluginToRemoveUrl = "http://bwa.to/cloud.js";
						deletePlugin(pluginToRemoveUrl);
					}
                },
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://bwa.to/cloud.js')
						setTimeout(function() {	
							$('div[data-name="Онлайн_BWA_Cloud"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Онлайн_BWA_Cloud"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Онлайн_BWA_Cloud"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://bwa.to/cloud.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Онлайн_BWA_Cloud"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://bwa.to/cloud.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Онлайн_BWA_Cloud"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Онлайн_BWA_Cloud"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Онлайн_BWA_Cloud"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_online_plugin',
					param: {
                               			name: 'Showy',
                   				type: 'select',
                   				values: {
							1:	'Установить',
							2:	'Удалить',
                   				},
					//default: '1',
               				},
					field: {
                                  		name: 'Showy',
                                  		description: 'Плагин для просмотра фильмов и сериалов в онлайн'
					},
                           		onChange: function(value) {
					if (value == '1') {
						itemON('http://showy.online/m.js', 'Showy', '@showy', 'Showy');
					}
					if (value == '2') {
						var pluginToRemoveUrl = "http://showy.online/m.js";
						deletePlugin(pluginToRemoveUrl);
					}
                },
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://showy.online/m.js')
						setTimeout(function() {	
							$('div[data-name="Showy"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Showy"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Showy"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://showy.online/m.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Showy"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://showy.online/m.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Showy"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Showy"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Showy"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});

                Lampa.SettingsApi.addParam({
					component: 'add_online_plugin',
					param: {
                               			name: 'durex_online',
                   				type: 'select',
                   				values: {
							1:	'Установить',
							2:	'Удалить',
                   				},
					//default: '1',
               				},
					field: {
                                  		name: 'Онлайн Durex',
                                  		description: 'Плагин для просмотра фильмов и сериалов в онлайн, замена BWA'
					},
                           		onChange: function(value) {
					if (value == '1') {
						itemON('http://durex.monster/online.js', 'Онлайн Durex', '@rik', 'durex_online');
					}
					if (value == '2') {
						var pluginToRemoveUrl = "http://durex.monster/online.js";
						deletePlugin(pluginToRemoveUrl);
					}
                },
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://bwa.to/cloud.js')
						setTimeout(function() {	
							$('div[data-name="Онлайн_BWA_Cloud"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Онлайн_BWA_Cloud"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Онлайн_BWA_Cloud"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://durex.monster/online.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="durex_online"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://durex.monster/online.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="durex_online"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="durex_online"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="durex_online"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
	
	       /* Lampa.SettingsApi.addParam({
                                  component: 'add_online_plugin',
                                  param: {
                                         name: 'Reboot_online_plugin',
                                         type: 'static',
                                  },
                                  field: {
                                         name: '<div class="settings-folder" style="padding:0!important"><div style="display: block; margin: 0 auto;height:2.3em;padding-right:.1em"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g style="fill:none;stroke:#ffffff;stroke-width:12px;stroke-linecap:round;stroke-linejoin:round;"> <path d="m 50,10 0,35"></path> <path d="M 20,29 C 4,52 15,90 50,90 85,90 100,47 74,20"></path> </g> <path style="fill:#ffffff;" d="m 2,21 29,-2 2,29"></path> </g></svg></div></div>',
					 description: '<div style="text-align: center;">Нажмите для перезагрузки Lampa</div>',
	                           },
                                   onRender: function (item) {
                                      item.on('hover:enter', function(){
                                         location.reload();
                                      });
                                   }
		});	*/		   
/* Торрент */
		Lampa.Settings.listener.follow('open', function (e) {
					if (e.name == 'main') {
						Lampa.SettingsApi.addComponent({
							component: 'add_torrent_plugin',
							name: 'Torrents'
						});
					}
		});
                     
		Lampa.SettingsApi.addParam({
					component: 'add_plugin',
					param: {
                                   		name: 'add_torrent_plugin',
                                   		type: 'static',
                                   		default: true
                           		},
					field: {
                                   		name: icon_add_torrent_plugin
                           		},
					onRender: function(item) {
						item.on('hover:enter', function () {
							Lampa.Settings.create('add_torrent_plugin');
							Lampa.Controller.enabled().controller.back = function(){
								Lampa.Settings.create('add_plugin');
							}
						});
					}
		});
                     
		Lampa.SettingsApi.addParam({
					component: 'add_torrent_plugin',
					param: {
						name: 'Switch_Parser',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
                  			},
					field: {
						name: 'Переключение парсеров',
						description: 'Плагин позволяет переключаться между парсерами jackett из списка с уже забитыми правильными параметрами. В настройках парсера появится пункт со списком общедоступных jacketts'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://bylampa.github.io/jackett.js', 'Переключение Парсеров', '@AndreyURL54', 'Switch_Parser');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/jackett.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://bylampa.github.io/jackett.js')
						setTimeout(function() {	
							$('div[data-name="Switch_Parser"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Switch_Parser"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Switch_Parser"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/jackett.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Switch_Parser"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/jackett.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Switch_Parser"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Switch_Parser"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Switch_Parser"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
         
		Lampa.SettingsApi.addParam({
					component: 'add_torrent_plugin',
					param: {
						name: 'Tracks',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
					},
					field: {
						name: 'Tracks',
						description: 'Плагин заменяет название аудиодорожек и субтитров в плеере (работает только в торрентах)'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('http://cub.red/plugin/tracks', 'Tracks', '@lampa', 'Tracks');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://cub.red/plugin/tracks";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://cub.red/plugin/tracks')
						setTimeout(function() {	
							$('div[data-name="Tracks"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Tracks"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Tracks"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://cub.red/plugin/tracks');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Tracks"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://cub.red/plugin/tracks') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Tracks"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Tracks"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Tracks"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_torrent_plugin',
					param: {
						name: 'Setting_torrents',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
					},
					field: {
						name: 'Настройка торрентов (Web OS, Tizen)',
						description: 'Плагин для ТВ, на которых Lampa установлена через официальные магазины LG Store и Tizen App Store. Включает в настройках отображение пунктов Парсер и Torrserver, необходимых для просмотра торрентов'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('http://cub.red/plugin/etor', 'Настройка Торрентов', '@lampa', 'Setting_torrents');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://cub.red/plugin/etor";
							deletePlugin(pluginToRemoveUrl);
                                                }
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://cub.red/plugin/etor')
						setTimeout(function() {	
							$('div[data-name="Setting_torrents"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Setting_torrents"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Setting_torrents"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://cub.red/plugin/etor');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Setting_torrents"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://cub.red/plugin/etor') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Setting_torrents"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Setting_torrents"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Setting_torrents"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_torrent_plugin',
					param: {
						name: 'Check_server',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
					},
					field: {
						name: 'Поиск локального TorrServera',
						description: 'Плагин позволяет произвести поиск вашего локального TorrServera'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('http://193.233.134.21/plugins/checker.js', 'Поиск Локального TorrServera', '@AndreyURL54', 'Check_server');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://193.233.134.21/plugins/checker.js";
							deletePlugin(pluginToRemoveUrl);
                                                }
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://193.233.134.21/plugins/checker.js')
						setTimeout(function() {	
							$('div[data-name="Check_server"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Check_server"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Check_server"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://193.233.134.21/plugins/checker.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Check_server"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://193.233.134.21/plugins/checker.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Check_server"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Check_server"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Check_server"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
	         Lampa.SettingsApi.addParam({
					component: 'add_torrent_plugin',
					param: {
						name: 'Torr_download',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
					},
					field: {
						name: 'Закачка торрентов',
						description: 'Плагин добавляет подключение торрент клиентов таких как qBittorent, Transmission с последующей возможностью загрузки торрента через него для локального просмотра'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://lampame.github.io/main/torrentmanager/torrentmanager.js', 'Закачка Торрентов', '@feliks', 'Torr_download');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://lampame.github.io/main/torrentmanager/torrentmanager.js";
							deletePlugin(pluginToRemoveUrl);
                                                }
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://lampame.github.io/td/td.js')
						setTimeout(function() {	
							$('div[data-name="Torr_download"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Torr_download"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Torr_download"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://lampame.github.io/main/torrentmanager/torrentmanager.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Torr_download"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://lampame.github.io/main/torrentmanager/torrentmanager.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Torr_download"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Torr_download"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Torr_download"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_torrent_plugin',
					param: {
						name: 'second_but_torrents',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
					},
					field: {
						name: 'Вторая кнопка Торренты',
						description: 'Плагин добавляет вторую кнопку Торренты'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://github.freebie.tom.ru/torrents.js', 'Вторая Кнопка Торренты', '@VitalikPVA', 'second_but_torrents');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://github.freebie.tom.ru/torrents.js";
							deletePlugin(pluginToRemoveUrl);
                                                }
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://github.freebie.tom.ru/torrents.js')
						setTimeout(function() {	
							$('div[data-name="second_but_torrents"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="second_but_torrents"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="second_but_torrents"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://github.freebie.tom.ru/torrents.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="second_but_torrents"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://github.freebie.tom.ru/torrents.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="second_but_torrents"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="second_but_torrents"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="second_but_torrents"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_torrent_plugin',
					param: {
						name: 'free_torr',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
					},
					field: {
						name: 'Free Torrserver',
						description: 'Плагин автоматически подставляет torrserver из своей базы'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://bylampa.github.io/freetorr.js', 'Free Torrserver', '@scabrum', 'free_torr');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/freetorr.js";
							deletePlugin(pluginToRemoveUrl);
                                                }
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://bylampa.github.io/freetorr.js')
						setTimeout(function() {	
							$('div[data-name="free_torr"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="free_torr"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="free_torr"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/freetorr.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="free_torr"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/freetorr.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="free_torr"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="free_torr"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="free_torr"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_torrent_plugin',
					param: {
						name: 'visual_ts',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
					},
					field: {
						name: 'Визуализация загрузки TS',
						description: 'Плагин показывает визуально загрузку TS перед запуском видео через торренты'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://plugin.rootu.top/ts-preload.js', 'Визуализация Загрузки TS', '@rootu', 'visual_ts');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://plugin.rootu.top/ts-preload.js";
							deletePlugin(pluginToRemoveUrl);
                                                }
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://bylampa.github.io/freetorr.js')
						setTimeout(function() {	
							$('div[data-name="free_torr"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="free_torr"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="free_torr"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://plugin.rootu.top/ts-preload.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="visual_ts"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://plugin.rootu.top/ts-preload.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="visual_ts"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="visual_ts"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="visual_ts"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
	/*
	        Lampa.SettingsApi.addParam({
                                  component: 'add_torrent_plugin',
                                  param: {
                                         name: 'Reboot_torrent_plugin',
                                         type: 'static',
                                  },
                                  field: {
                                         name: '<div class="settings-folder" style="padding:0!important"><div style="display: block; margin: 0 auto;height:2.3em;padding-right:.1em"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g style="fill:none;stroke:#ffffff;stroke-width:12px;stroke-linecap:round;stroke-linejoin:round;"> <path d="m 50,10 0,35"></path> <path d="M 20,29 C 4,52 15,90 50,90 85,90 100,47 74,20"></path> </g> <path style="fill:#ffffff;" d="m 2,21 29,-2 2,29"></path> </g></svg></div></div>',
					 description: '<div style="text-align: center;">Нажмите для перезагрузки Lampa</div>',
	                           },
                                   onRender: function (item) {
                                      item.on('hover:enter', function(){
                                         location.reload();
                                      });
                                   }
		});*/			   
	
		Lampa.Settings.listener.follow('open', function (e) {
					if (e.name == 'main') {
						Lampa.SettingsApi.addComponent({
							component: 'add_tv_plugin',
							name: 'TV'
						});
					}
		});
/* Телеканалы */
		Lampa.SettingsApi.addParam({
					component: 'add_plugin',
					param: {
						name: 'add_tv_plugin',
						type: 'static',
						default: true
					},
					field: {
						name: icon_add_tv_plugin
					},
					onRender: function(item) {
						item.on('hover:enter', function () {
							Lampa.Settings.create('add_tv_plugin');
							Lampa.Controller.enabled().controller.back = function(){
								Lampa.Settings.create('add_plugin');
							}
						});
					}
		});
		
		Lampa.SettingsApi.addParam({
					component: 'add_tv_plugin',
					param: {
						name: 'Diesel',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
					},
					field: {
						name: 'Дизель ТВ',
						description: 'Плагин для бесплатного просмотра телеканалов и коммерческих плейлистов с телепрограммой и записью архива'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://andreyurl54.github.io/diesel5/diesel.js', 'Дизель ТВ', '@AndreyURL54', 'Diesel');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://andreyurl54.github.io/diesel5/diesel.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://andreyurl54.github.io/diesel5/diesel.js')
						setTimeout(function() {	
							$('div[data-name="Diesel"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Diesel"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Diesel"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://andreyurl54.github.io/diesel5/diesel.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Diesel"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://andreyurl54.github.io/diesel5/diesel.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Diesel"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Diesel"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Diesel"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
		
		Lampa.SettingsApi.addParam({
					component: 'add_tv_plugin',
					param: {
						name: 'Kulik',
                        			type: 'select',
                        			values: {
							1:	'Установить',
							2:	'Удалить',
                        		},
					//default: '1',
					},
					field: {
						name: 'Kulik',
						description: 'Плагин для просмотра IPTV каналов, отсортированных по различным категориям. Есть возможность поменять стиль плагина, сервер вещания, а также добавить каналы в избранное'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('http://cdn.kulik.uz/cors', 'Kulik TV', '@SawamuraRen', 'Kulik');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://cdn.kulik.uz/cors";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://cdn.kulik.uz/cors')
						setTimeout(function() {	
							$('div[data-name="Kulik"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Kulik"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Kulik"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://cdn.kulik.uz/cors');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Kulik"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://cdn.kulik.uz/cors') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Kulik"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Kulik"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Kulik"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});

		Lampa.SettingsApi.addParam({
					component: 'add_tv_plugin',
					param: {
						name: 'IPTV',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
					},
					field: {
							name: 'IPTV',
							description: 'Плагин для просмотра IPTV каналов. Сортировка каналов по группам и возможность добавить каналы в избранное. Работает только со своим плейлистом, добавленным на сайте https://cub.watch/iptv'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('http://cub.red/plugin/iptv', 'IPTV', '@lampa', 'IPTV');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://cub.red/plugin/iptv";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://cub.red/plugin/iptv')
						setTimeout(function() {	
							$('div[data-name="IPTV"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="IPTV"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="IPTV"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://cub.red/plugin/iptv');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="IPTV"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://cub.red/plugin/iptv') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="IPTV"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="IPTV"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="IPTV"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_tv_plugin',
					param: {
						name: 'Hack_TV',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
					//default: '1',
					},
					field: {
							name: 'Hack TV',
							description: 'Плагин для просмотра IPTV каналов'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://bylampa.github.io/tv.js', 'Hack TV', '@scabrum', 'Hack_TV');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bylampa.github.io/tv.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://bylampa.github.io/tv.js')
						setTimeout(function() {	
							$('div[data-name="Hack_TV"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Hack_TV"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Hack_TV"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bylampa.github.io/tv.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Hack_TV"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bylampa.github.io/tv.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Hack_TV"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Hack_TV"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Hack_TV"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
	       /* Lampa.SettingsApi.addParam({
                                  component: 'add_tv_plugin',
                                  param: {
                                         name: 'Reboot_tv_plugin',
                                         type: 'static',
                                  },
                                  field: {
                                         name: '<div class="settings-folder" style="padding:0!important"><div style="display: block; margin: 0 auto;height:2.3em;padding-right:.1em"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g style="fill:none;stroke:#ffffff;stroke-width:12px;stroke-linecap:round;stroke-linejoin:round;"> <path d="m 50,10 0,35"></path> <path d="M 20,29 C 4,52 15,90 50,90 85,90 100,47 74,20"></path> </g> <path style="fill:#ffffff;" d="m 2,21 29,-2 2,29"></path> </g></svg></div></div>',
					 description: '<div style="text-align: center;">Нажмите для перезагрузки Lampa</div>',
	                           },
                                   onRender: function (item) {
                                      item.on('hover:enter', function(){
                                         location.reload();
                                      });
                                   }
		});*/			   
               
	        /*Lampa.Settings.listener.follow('open', function (e) {
					if (e.name == 'main') {
						Lampa.SettingsApi.addComponent({
							component: 'add_music_plugin',
							name: 'Music'
						});
					}
		});*/
/* Музыка */
		/*Lampa.SettingsApi.addParam({
					component: 'add_plugin',
					param: {
						name: 'add_music_plugin',
						type: 'static',
					default: true
                         		},
					field: {
						name: icon_add_music_plugin
                         		},
					onRender: function(item) {
						item.on('hover:enter', function () {
							Lampa.Settings.create('add_music_plugin');
							Lampa.Controller.enabled().controller.back = function(){
								Lampa.Settings.create('add_plugin');
							}
						});
					}
		});*/

	        /*Lampa.SettingsApi.addParam({
					component: 'add_music_plugin',
					param: {
						name: 'lme_music',
       				                type: 'select',
                       				values: {
							1:	'Установить',
							2:	'Удалить',
                        			},
					//default: '1',
					},
					field: {
						name: 'LME Music',
						description: 'Слушаем или смотрим live с YouTube по жанрам (доступен поиск)'
					},
					onChange: function(value) {
                        			if (value == '1') {
							itemON('https://lampame.github.io/main/music.js', 'LME Music', '@GwynnBleiidd', 'lme_music');
                     				}
						if (value == '2') {
							var pluginToRemoveUrl = "https://lampame.github.io/main/music.js";
							deletePlugin(pluginToRemoveUrl);
						}
                    },
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://lampame.github.io/main/music.js')
						setTimeout(function() {	
							$('div[data-name="lme_music"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="lme_music"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="lme_music"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						/*var myResult = checkPlugin('https://lampame.github.io/main/music.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="lme_music"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://lampame.github.io/main/music.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="lme_music"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="lme_music"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="lme_music"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});*/
	
                /* Lampa.SettingsApi.addParam({
                                  component: 'add_music_plugin',
                                  param: {
                                         name: 'Reboot_music_plugin',
                                         type: 'static',
                                  },
                                  field: {
                                         name: '<div class="settings-folder" style="padding:0!important"><div style="display: block; margin: 0 auto;height:2.3em;padding-right:.1em"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g style="fill:none;stroke:#ffffff;stroke-width:12px;stroke-linecap:round;stroke-linejoin:round;"> <path d="m 50,10 0,35"></path> <path d="M 20,29 C 4,52 15,90 50,90 85,90 100,47 74,20"></path> </g> <path style="fill:#ffffff;" d="m 2,21 29,-2 2,29"></path> </g></svg></div></div>',
					 description: '<div style="text-align: center;">Нажмите для перезагрузки Lampa</div>',
	                           },
                                   onRender: function (item) {
                                      item.on('hover:enter', function(){
                                         location.reload();
                                      });
                                   }
		});*/			   
	
		Lampa.Settings.listener.follow('open', function (e) {
					if (e.name == 'main') {
						Lampa.SettingsApi.addComponent({
							component: 'add_radio_plugin',
							name: 'Radio'
						});
					}
		});
/* Радио */
		Lampa.SettingsApi.addParam({
					component: 'add_plugin',
					param: {
						name: 'add_radio_plugin',
						type: 'static',
					default: true
                         		},
					field: {
						name: icon_add_radio_plugin
                         		},
					onRender: function(item) {
						item.on('hover:enter', function () {
							Lampa.Settings.create('add_radio_plugin');
							Lampa.Controller.enabled().controller.back = function(){
								Lampa.Settings.create('add_plugin');
							}
						});
					}
		});
		
		Lampa.SettingsApi.addParam({
					component: 'add_radio_plugin',
					param: {
						name: 'Record',
                        			type: 'select',
                        			values: {
							1:	'Установить',
							2:	'Удалить',
                        			},
					//default: '1',
					},
					field: {
						name: 'Радио Record',
						description: 'Прослушивание радио от радиостанции Radio Record. Доступно более 50 жанров, найдется и на ваш вкус'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('http://cub.red/plugin/radio', 'Радио Record', '@lampa', 'Record');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://cub.red/plugin/radio";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://cub.red/plugin/radio')
						setTimeout(function() {	
							$('div[data-name="Record"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Record"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Record"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://cub.red/plugin/radio');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Record"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://cub.red/plugin/radio') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Record"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Record"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Record"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
		
		Lampa.SettingsApi.addParam({
					component: 'add_radio_plugin',
					param: {
						name: 'Record_Mod',
       				                type: 'select',
                       				values: {
							1:	'Установить',
							2:	'Удалить',
                        			},
					//default: '1',
					},
					field: {
						name: 'Радио Record Mod',
						description: 'Всё тот же плагин Радио Record, но с единым списком станций без разделения на жанры'
					},
					onChange: function(value) {
                        			if (value == '1') {
							itemON('https://lampame.github.io/main/rradio.js', 'Радио Record Mod', '@GwynnBleiidd', 'Record_Mod');
                     				}
						if (value == '2') {
							var pluginToRemoveUrl = "https://lampame.github.io/main/rradio.js";
							deletePlugin(pluginToRemoveUrl);
						}
                                        },
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://lampame.github.io/main/rradio.js')
						setTimeout(function() {	
							$('div[data-name="Record_Mod"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Record_Mod"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Record_Mod"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://lampame.github.io/main/rradio.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Record_Mod"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://lampame.github.io/main/rradio.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Record_Mod"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Record_Mod"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Record_Mod"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});

	        Lampa.SettingsApi.addParam({
					component: 'add_radio_plugin',
					param: {
						name: 'Radio_Soma',
       				                type: 'select',
                       				values: {
							1:	'Установить',
							2:	'Удалить',
                        			},
					//default: '1',
					},
					field: {
						name: 'Радио SomaFM',
						description: 'Более 30 уникальных каналов андерграундного/альтернативного радиовещания по всему миру, поддерживаемых слушателями, без рекламы.'
					},
					onChange: function(value) {
                        			if (value == '1') {
							itemON('https://tsynik.github.io/lampa/soma.js', 'Радио SomaFM', '@tsynik', 'Radio_Soma');
                     				}
						if (value == '2') {
							var pluginToRemoveUrl = "https://tsynik.github.io/lampa/soma.js";
							deletePlugin(pluginToRemoveUrl);
						}
                                        },
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://tsynik.github.io/lampa/soma.js')
						setTimeout(function() {	
							$('div[data-name="Radio_Soma"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Radio_Soma"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Radio_Soma"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://tsynik.github.io/lampa/soma.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Radio_Soma"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://tsynik.github.io/lampa/soma.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Radio_Soma"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Radio_Soma"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Radio_Soma"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
	       /* Lampa.SettingsApi.addParam({
                                  component: 'add_radio_plugin',
                                  param: {
                                         name: 'Reboot_radio_plugin',
                                         type: 'static',
                                  },
                                  field: {
                                         name: '<div class="settings-folder" style="padding:0!important"><div style="display: block; margin: 0 auto;height:2.3em;padding-right:.1em"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g style="fill:none;stroke:#ffffff;stroke-width:12px;stroke-linecap:round;stroke-linejoin:round;"> <path d="m 50,10 0,35"></path> <path d="M 20,29 C 4,52 15,90 50,90 85,90 100,47 74,20"></path> </g> <path style="fill:#ffffff;" d="m 2,21 29,-2 2,29"></path> </g></svg></div></div>',
					 description: '<div style="text-align: center;">Нажмите для перезагрузки Lampa</div>',
	                           },
                                   onRender: function (item) {
                                      item.on('hover:enter', function(){
                                         location.reload();
                                      });
                                   }
		});*/			   
/* Клубника */
		Lampa.Settings.listener.follow('open', function (e) {
					if (e.name == 'main') {
						Lampa.SettingsApi.addComponent({
                            component: 'add_sisi_plugin',
							name: 'Sisi'
						});
					}
		});
		
		Lampa.SettingsApi.addParam({
					component: 'add_plugin',
					param: {
						name: 'add_sisi_plugin',
						type: 'static',
						default: true
					},
					field: {
						name: icon_add_sisi_plugin
					},
					onRender: function(item) {
						item.on('hover:enter', function () {
							Lampa.Settings.create('add_sisi_plugin');
							Lampa.Controller.enabled().controller.back = function(){
								Lampa.Settings.create('add_plugin');
							}
						});
					}
		});
		
		Lampa.SettingsApi.addParam({
					component: 'add_sisi_plugin',
					param: {
						name: 'Sisi',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
						//default: '1',
					},
					field: {
						name: 'Клубничка',
						description: 'Плагин для просмотра контента 18+'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('https://bwa.to/s', 'Клубничка', '@rik', 'Sisi');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "https://bwa.to/s";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('https://bwa.to/s')
						setTimeout(function() {	
							$('div[data-name="Sisi"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Sisi"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Sisi"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('https://bwa.to/s');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Sisi"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'https://bwa.to/s') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Sisi"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Sisi"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Sisi"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
	        Lampa.SettingsApi.addParam({
					component: 'add_sisi_plugin',
					param: {
						name: 'Nyam',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
						//default: '1',
					},
					field: {
						name: 'Клубничка (bwa cloud)',
						description: 'Другая версия плагина Клубничка (подходит для старых устройств и у кого не завелся основной плагин)'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('http://bwa-cloud.cfhttp.top/sisi.js', 'Клубничка (Bwa Cloud)', '@rik', 'Nyam');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://bwa-cloud.cfhttp.top/sisi.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://bwa-cloud.cfhttp.top/sisi.js')
						setTimeout(function() {	
							$('div[data-name="Nyam"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Nyam"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Nyam"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://bwa-cloud.cfhttp.top/sisi.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="Nyam"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://bwa-cloud.cfhttp.top/sisi.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="Nyam"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="Nyam"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="Nyam"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});

                Lampa.SettingsApi.addParam({
					component: 'add_sisi_plugin',
					param: {
						name: 'sisi_durex',
						type: 'select',
						values: {
							1:	'Установить',
							2:	'Удалить',
						},
						//default: '1',
					},
					field: {
						name: 'Клубничка Durex',
						description: 'Замена Клубнички BWA'
					},
					onChange: function(value) {
						if (value == '1') {
							itemON('http://durex.monster/sisi.js', 'Клубничка Durex', '@rik', 'sisi_durex');
						}
						if (value == '2') {
							var pluginToRemoveUrl = "http://durex.monster/sisi.js";
							deletePlugin(pluginToRemoveUrl);
						}
					},
					onRender: function (item) {$('.settings-param__name', item).css('color','f3d900'); hideInstall();
						/*var myResult = checkPlugin('http://bwa-cloud.cfhttp.top/sisi.js')
						setTimeout(function() {	
							$('div[data-name="Nyam"]').append('<div class="settings-param__status one"></div>')
							if (myResult) {
								$('div[data-name="Nyam"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
							} else {
								$('div[data-name="Nyam"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
							}
						}, 100);*/
						var myResult = checkPlugin('http://durex.monster/sisi.js');
                                                var pluginsArray = Lampa.Storage.get('plugins');
                                                    setTimeout(function() {
                                                       $('div[data-name="sisi_durex"]').append('<div class="settings-param__status one"></div>');
                                                       var pluginStatus = null;
                                                       for (var i = 0; i < pluginsArray.length; i++) {
                                                          if (pluginsArray[i].url === 'http://durex.monster/sisi.js') {
                                                             pluginStatus = pluginsArray[i].status;
                                                             break;
                                                          }
                                                       }
                                                       if (myResult && pluginStatus !== 0) {
                                                          $('div[data-name="sisi_durex"]').find('.settings-param__status').removeClass('active error').addClass('active');
                                                       } else if (pluginStatus === 0) {
                                                          $('div[data-name="sisi_durex"]').find('.settings-param__status').removeClass('active error').css('background-color', 'rgb(255, 165, 0)');
                                                       } else {
                                                          $('div[data-name="sisi_durex"]').find('.settings-param__status').removeClass('active error').addClass('error');
                                                       }
                                                    }, 100);	
					}
		});
	
	        /*Lampa.SettingsApi.addParam({
                                  component: 'add_sisi_plugin',
                                  param: {
                                         name: 'Reboot_sisi_plugin',
                                         type: 'static',
                                  },
                                  field: {
                                         name: '<div class="settings-folder" style="padding:0!important"><div style="display: block; margin: 0 auto;height:2.3em;padding-right:.1em"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g style="fill:none;stroke:#ffffff;stroke-width:12px;stroke-linecap:round;stroke-linejoin:round;"> <path d="m 50,10 0,35"></path> <path d="M 20,29 C 4,52 15,90 50,90 85,90 100,47 74,20"></path> </g> <path style="fill:#ffffff;" d="m 2,21 29,-2 2,29"></path> </g></svg></div></div>',
					 description: '<div style="text-align: center;">Нажмите для перезагрузки Lampa</div>',
	                           },
                                   onRender: function (item) {
                                      item.on('hover:enter', function(){
                                         location.reload();
                                      });
                                   }
		}); */
/* Реклама */
      Lampa.SettingsApi.addParam({
					component: 'add_plugin',
					param: {
						name: 'add_ads',
      		                        	type: 'title'
                        		},
					field: {
                                            name: ads
                                        },
                                        onRender: function (item) {
                                            setTimeout(function() {
                                               //   $('.settings-param-title').insertBefore($('.settings-param').first())
                                               $('.settings-param-title').insertAfter($('.settings-param').last())
                                            },0);
                                        }
	
         });	

	 Lampa.Settings.listener.follow('open', function(e) {
	    if (e.name == 'add_plugin') {
                setTimeout(function() {
                    // убираем артефакты после входа в Расширения, надпись "Редактировать" / "Ещё" / "История" / "Статус"
			        if (document.querySelector("div > span > div > span")) {
					if (document.querySelector("div > span > div > span").innerText == '@lampa_plugins_uncensored') {
						$('div > span:contains("Еще")').parent().remove()
						$('div > span:contains("Редактировать")').parent().remove()
						$('div > span:contains("История")').parent().remove()
						$('div > span:contains("Статус")').parent().remove()
					}
				}
                }, 0);
            }
	    
        });
/* Счётчик Яндекса */    
	(function(m, e, t, r, i, k, a) {
                       m[i] = m[i] || function() {
                               (m[i].a = m[i].a || []).push(arguments)
                       };
                       m[i].l = 1 * new Date();
                       for(var j = 0; j < document.scripts.length; j++) {
                               if(document.scripts[j].src === r) {
                                       return;
                               }
                       }
                       k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
    })
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    ym(93937344, "init", {clickmap: true,trackLinks: true,accurateTrackBounce: true})
    var METRIKA = '<noscript><div><img src="https://mc.yandex.ru/watch/93937344" style="position:absolute; left:-9999px;" alt="" /></div></noscript>';
    $('body').append(METRIKA);


} // /* addonStart */

if (!!window.appready) addonStart();
else Lampa.Listener.follow('app', function(e){if (e.type === 'ready') addonStart()});	
	
})();
