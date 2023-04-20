import request from '@/utils/request'
export function blueprintInput(data) {
    return request({
        url: '/system/manage/blueprintInput?blueprintCode='+data,
        method: 'get',
    })
}

export function checkBlueprint(name) {
    return request({
        url: '/system/manage/checkBlueprint?blueprintName='+name,
        method: 'get',
    })
}

export function addNewMaterialItem(material_name,materialTypeCode) {
    return request({
        url: '/system/manage/addNewMaterialItem?material_name='+material_name+'&materialTypeCode='+materialTypeCode,
        method: 'get',
    })
}

export function getBlueprintOperate() {
    return request({
        url: '/system/manage/getBlueprintOperate',
        method: 'get',
    })
}