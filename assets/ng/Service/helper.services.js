angular.module('helper.service', []).factory('helperServices', helperServices);

function helperServices($location) {
	var service = { IsBusy: false, absUrl: $location.$$absUrl };
	service.url = $location.$$protocol + '://' + $location.$$host;
	if ($location.$$port) {
		service.url = service.url + ':' + $location.$$port;
	}

	// '    http://localhost:5000';

	service.groupBy = (list, keyGetter) => {
		const map = new Map();
		list.forEach((item) => {
			const key = keyGetter(item);
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [ item ]);
			} else {
				collection.push(item);
			}
		});
		return map;
    };
    service.ruangan = ['AULA','IIIA','IIIB','IIIC','IIIDE', 'IVA' ,'IVB', 'IVC', 'IVD', 'IVE' , 'KR1', 'KR2', 'LABHW', 'LABSW', 'LABTEKPANG', 'ZOOM' ];
    service.hari = ['SENIN','SELASA','RABU','KAMIS','JUMAT','SABTU'];
    service.jenis = ['DOSEN','ASISTEN'];
    service.statusmengajar = ['Y','T'];
	service.romanize =  (num)=> {
		if (isNaN(num))
			return NaN;
		var digits = String(+num).split(""),
			key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
				   "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
				   "","I","II","III","IV","V","VI","VII","VIII","IX"],
			roman = "",
			i = 3;
		while (i--)
			roman = (key[+digits.pop() + (i * 10)] || "") + roman;
		return Array(+digits.join("") + 1).join("M") + roman;
	}
	return service;
}
