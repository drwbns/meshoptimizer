// This file is part of meshoptimizer library and is distributed under the terms of MIT License.
// Copyright (C) 2016-2021, by Arseny Kapoulkine (arseny.kapoulkine@gmail.com)
var MeshoptEncoder = (function() {
	"use strict";

	// Built with clang version 11.0.0 (https://github.com/llvm/llvm-project 176249bd6732a8044d457092ed932768724a6f06)
	// Built from meshoptimizer 0.16
	var wasm = "B9h79tEBBBENQ9gEUEU9gEUB9gBB9gVUUUUUEU9gDUUEU9gLUUUUEU9gIUUUEU9gVUUUUUB9gLUUUUB9gD99UE99Ie8aDILEVOLEVLRRRRRWWVBOOBEdddLVE9wEIIVIEBEOWEUEC+Q/KEKR/QIhO9tw9t9vv95DBh9f9f939h79t9f9j9h229f9jT9vv7BB8a9tw79o9v9wT9fw9u9j9v9kw9WwvTw949C919m9mwvBE8f9tw79o9v9wT9fw9u9j9v9kw9WwvTw949C919m9mwv9C9v919u9kBDe9tw79o9v9wT9fw9u9j9v9kw9WwvTw949Wwv79p9v9uBIy9tw79o9v9wT9fw9u9j9v9kw69u9kw949C919m9mwvBL8e9tw79o9v9wT9fw9u9j9v9kw69u9kw949C919m9mwv9C9v919u9kBO8a9tw79o9v9wT9fw9u9j9v9kw69u9kw949Wwv79p9v9uBRe9tw79o9v9wT9fw9u9j9v9kw69u9kw949Twg91w9u9jwBWA9tw79o9v9wT9fw9u9j9v9kw69u9kw949Twg91w9u9jw9C9v919u9kBdl9tw79o9v9wT9fw9u9j9v9kws9p2Twv9P9jTBQk9tw79o9v9wT9fw9u9j9v9kws9p2Twv9R919hTBKl9tw79o9v9wT9fw9u9j9v9kws9p2Twvt949wBXe9tw79o9v9wT9f9v9wT9p9t9p96w9WwvTw94j9h9j9owBSA9tw79o9v9wT9f9v9wT9p9t9p96w9WwvTw94j9h9j9ow9TTv9p9wBZA9tw79o9v9wT9f9v9wT9p9t9p96w9WwvTw94swT9j9o9Sw9t9h9wBhL79iv9rBodWEBCEKDqxQ+f9Q8aDBK/EpE8jU8jJJJJBCJO9rGV8kJJJJBCBHODNALCEFAE0MBABCBrBJ+KJJBC+gEv86BBAVCJDFCBCJDZnJJJB8aDNAItMBAVCJDFADALZ+TJJJB8aKABAEFHRABCEFHEAVALFCBCBCJDAL9rALCfE0eZnJJJB8aAVAVCJDFALZ+TJJJBHWCJ/ABAL9uHODNAItMBAOC/wfBgGOCJDAOCJD6eHdCBHQINAWCJLFCBCJDZnJJJB8aAdAIAQ9rAQAdFAI6eHKADAQAL2FHXDNALtMBAKCSFGOC9wgHMAOCL4CIFCD4HpCBHSAXHZAEHhINDNAKtMBAWASFrBBHoCBHEAZHOINAWCJLFAEFAOrBBGaAo9rGoCETAoCkTCk91CR4786BBAOALFHOAaHoAECEFGEAK9HMBKKDNARAh9rAp6MBAhCBApZnJJJBGcApFHEDNAMtMBCBHxAWCJLFHqINARAE9rCk6MDAWCJLFAxFGlrBDHoCUHODNAlrBEGaAlrBBGkvCfEgMBCBHaAoCfEgMBCBHoDNAlrBIMBAlrBLMBAlrBVMBAlrBOMBAlrBRMBAlrBWMBAlrBdMBAlrBQMBAlrBKMBAlrBXMBAlrBMMBCBHaAlrBpMECBHoCUCBAlrBSeHOKCBHaKDNDNDNDNCLCDCECWAOCZ6GheAkCfEgGkCD0CLvAaCfEgGaCD0FAoCfEgGoCD0FAlrBIGyCD0FAlrBLG8aCD0FAlrBVGeCD0FAlrBOG3CD0FAlrBRG5CD0FAlrBWG8eCD0FAlrBdG8fCD0FAlrBQGACD0FAlrBKGHCD0FAlrBXGGCD0FAlrBMG8jCD0FAlrBpG8kCD0FAlrBSG8lCD0FG8mAOCZAheG8n6GOeAkCp0CWvAaCp0FAoCp0FAyCp0FA8aCp0FAeCp0FA3Cp0FA5Cp0FA8eCp0FA8fCp0FAACp0FAHCp0FAGCp0FA8jCp0FA8kCp0FA8lCp0FA8mA8nAOe6GoeGyCUFpDIEBKAcAxCO4FGaAarBBCDCIAoeAxCI4COgTv86BBAyCW9HMEAEAl8pBB83BBAECWFAlCWF8pBB83BBAECZFHEXDKAcAxCO4FGaAarBBCEAxCI4COgTv86BBKCDCLCWCEAheAOeAoeH8aCUAyTCU7HaCBH5AqHeINAEH3A8aHoAeHECBHOINAErBBGhAaAhAaCfEgGk6eAOCfEgAyTvHOAECEFHEAoCUFGoMBKA3AO86BBAeA8aFHeA3CEFHEA5A8aFG5CZ6MBKDNAlrBBGOAk6MBA3AO86BEA3CDFHEKDNAlrBEGOAk6MBAEAO86BBAECEFHEKDNAlrBDGOAk6MBAEAO86BBAECEFHEKDNAlrBIGOAk6MBAEAO86BBAECEFHEKDNAlrBLGOAk6MBAEAO86BBAECEFHEKDNAlrBVGOAk6MBAEAO86BBAECEFHEKDNAlrBOGOAk6MBAEAO86BBAECEFHEKDNAlrBRGOAk6MBAEAO86BBAECEFHEKDNAlrBWGOAk6MBAEAO86BBAECEFHEKDNAlrBdGOAk6MBAEAO86BBAECEFHEKDNAlrBQGOAk6MBAEAO86BBAECEFHEKDNAlrBKGOAk6MBAEAO86BBAECEFHEKDNAlrBXGOAk6MBAEAO86BBAECEFHEKDNAlrBMGOAk6MBAEAO86BBAECEFHEKDNAlrBpGOAk6MBAEAO86BBAECEFHEKAlrBSGOAk6MBAEAO86BBAECEFHEKAqCZFHqAxCZFGxAM6MBKKAEtMBAZCEFHZAEHhASCEFGSALsMDXEKKCBHOXIKAWAXAKCUFAL2FALZ+TJJJB8aAKAQFGQAI6MBKKCBHOARAE9rCAALALCA6e6MBDNALC8f0MBAECBCAAL9rGOZnJJJBAOFHEKAEAWCJDFALZ+TJJJBALFAB9rHOKAVCJOF8kJJJJBAOK9HEEUAECAAECA0eABCJ/ABAE9uC/wfBgGDCJDADCJD6eGDFCUFAD9uAE2ADCL4CIFCD4ADv2FCEFKMBCBABbDJ+KJJBK/pSEeU8jJJJJBC/AE9rGL8kJJJJBCBHVDNAICI9uGOChFAE0MBABCBYD+E+KJJBGRC/gEv86BBALC/ABFCfECJEZnJJJB8aALCuFGW9CU83IBALC8wFGd9CU83IBALCYFGQ9CU83IBALCAFGK9CU83IBALCkFGX9CU83IBALCZFGM9CU83IBAL9CU83IWAL9CU83IBABAEFC9wFGpABCEFGSAOFGE6HODNAItMBCMCSARCB9KeHZCBHhCBHoCBHaCBHcCBHxINDNAOCEgtMBCBHVXIKCDHqADAaCDTFGOYDBHlAOCWFYDBHkAOCLFYDBHyCBH8aCBHODNDNDNDNDNDNDNDNDNINALC/ABFAOCU7AxFCSgCITFGVYDLHeDNAVYDBGVAl9HMBAeAy9HMBAqC9+FHqXDKDNAVAy9HMBAeAk9HMBAqCUFHqXDKDNAVAk9HMBAeAlsMDKAqCLFHqA8aCZFH8aAOCEFGOCZ9HMBXDKKAqC870MBADAqCIgCX2GVC+E1JJBFYDBAaFCDTFYDBHqADAVCJ1JJBFYDBAaFCDTFYDBHyALADAVC11JJBFYDBAaFCDTFYDBGVAcZ+FJJJBGeCBCSAVAhsGkeAeCB9KAeAZ9IgGleHeAkAlCE7gHkDNARCE9IMBAeCS9HMBAVAVAoAVCEFAosGeeGoCEFsMDCMCSAeeHeKASAeA8av86BBAeCS9HMDAVAo9rGOCETAOC8f917HOINAEAOCfB0CRTAOCfBgv86BBAECEFHEAOCR4GOMBKAVHoXIKADCEAkAhsCETAyAhseCX2GOC11JJBFYDBAaFCDTFYDBHqADAOC+E1JJBFYDBAaFCDTFYDBHeADAOCJ1JJBFYDBAaFCDTFYDBHVCBHlDNARCE9IMBAhtMBAVMBAeCE9HMBAqCD9HMBAW9CU83IBAd9CU83IBAQ9CU83IBAK9CU83IBAX9CU83IBAM9CU83IBAL9CU83IWAL9CU83IBCBHhCEHlKAhAVAhsGOFH8aALAeAcZ+FJJJBHyALAqAcZ+FJJJBHkAyCM0MLAyCEFHyXVKCpHeASAOCLTCpv86BBAVHoKAetMBAeAZ9IMEKALAcCDTFAVbDBAcCEFCSgHcKAhAkFHhALC/ABFAxCITFGOAqbDLAOAVbDBALC/ABFAxCEFCSgGOCITFGeAVbDLAeAybDBAOCEFHVXDKCBCSAeA8asG3eHyA8aA3FH8aKDNDNAkCM0MBAkCEFHkXEKCBCSAqA8asG3eHkA8aA3FH8aKDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNAkAyCLTvG3CfEgG5C+qUFp9UISSSSSSSSSSSSSSWSLQMSSSSSSSSSSSSESVSSSSSSSSSSSSSRDSdSSSSSSSSSSSSSSKSSSSSSSSSSSSSSSSOBKC/wEH8eA5pDMKpKC/xEH8eXXKC/yEH8eXKKC/zEH8eXQKC/0EH8eXdKC/1EH8eXWKC/2EH8eXRKC/3EH8eXOKC/4EH8eXVKC/5EH8eXLKC/6EH8eXIKC/7EH8eXDKC/8EH8eXEKCPEH8eKAlAVAh9HvMBASA8e86BBXEKASC9+CUAOe86BBAEA386BBAECEFHEKDNAOMBAVAo9rGOCETAOC8f917HOINAEAOCfB0CRTAOCfBgv86BBAECEFHEAOCR4GOMBKAVHoKDNAyCS9HMBAeAo9rGOCETAOC8f917HOINAEAOCfB0CRTAOCfBgv86BBAECEFHEAOCR4GOMBKAeHoKDNAkCS9HMBAqAo9rGOCETAOC8f917HOINAEAOCfB0CRTAOCfBgv86BBAECEFHEAOCR4GOMBKAqHoKALAcCDTFAVbDBAcCEFCSgHODNDNAypZBEEEEEEEEEEEEEEBEKALAOCDTFAebDBAcCDFCSgHOKDNDNAkpZBEEEEEEEEEEEEEEBEKALAOCDTFAqbDBAOCEFCSgHOKALC/ABFAxCITFGyAVbDLAyAebDBALC/ABFAxCEFCSgCITFGyAebDLAyAqbDBALC/ABFAxCDFCSgCITFGeAqbDLAeAVbDBAxCIFHVAOHcA8aHhKApAE6HOASCEFHSAVCSgHxAaCIFGaAI6MBKKCBHVAOMBAE9C/lm+i/D+Z+g8a83BWAE9CJ/s+d+0/1+M/e/U+GU83BBAEAB9rCZFHVKALC/AEF8kJJJJBAVK+mIEEUCBHIDNABADCUFCSgCDTFYDBAEsMBCEHIABADCpFCSgCDTFYDBAEsMBCDHIABADCMFCSgCDTFYDBAEsMBCIHIABADCXFCSgCDTFYDBAEsMBCLHIABADCKFCSgCDTFYDBAEsMBCVHIABADCQFCSgCDTFYDBAEsMBCOHIABADCdFCSgCDTFYDBAEsMBCRHIABADCWFCSgCDTFYDBAEsMBCWHIABADCRFCSgCDTFYDBAEsMBCdHIABADCOFCSgCDTFYDBAEsMBCQHIABADCVFCSgCDTFYDBAEsMBCKHIABADCLFCSgCDTFYDBAEsMBCXHIABADCIFCSgCDTFYDBAEsMBCMHIABADCDFCSgCDTFYDBAEsMBCpHIABADCEFCSgCDTFYDBAEsMBCSCUABADCSgCDTFYDBAEseSKAIKjEIUCRHDDNINADCEFHIADC96FGLC8f0MEAIHDCEALTAE6MBKKAICR9uCI2CDFABCI9u2ChFKMBCBABbD+E+KJJBK+YDERU8jJJJJBCZ9rHLCBHVDNAICVFAE0MBCBHVABCBrB+E+KJJBC/QEv86BBAL9CB83IWABCEFHOABAEFC98FHRDNAItMBCBHWINDNARAO0MBCBSKAVADAWCDTFYDBGdALCWFAVCDTFYDB9rGEAEC8f91GEFAE7C59K7GVAdALCWFAVCDTFGQYDB9rGEC8f91CETAECDT7vHEINAOAECfB0CRTAECfBgv86BBAOCEFHOAECR4GEMBKAQAdbDBAWCEFGWAI9HMBKKCBHVARAO6MBAOCBbBBAOAB9rCLFHVKAVK86EIUCWHDDNINADCEFHIADC95FGLC8f0MEAIHDCEALTAE6MBKKAICR9uAB2CVFK+yWDEUO99DNAEtMBADCLsHVCUADCETCUFTCU7HDDNDNCUAICUFTCU7+yGOjBBBzmGR+LjBBB9P9dtMBAR+oHIXEKCJJJJ94HIKAD+yHWDNAVMBABCOFHDINALCLFiDBGRjBBBBjBBJzALiDBGd+LAR+LmALCWFiDBGQ+LmGR+VARjBBBB9beGRnHKAdARnHRALCXFiDBHdDNDNAQjBBBB9gtMBAKHQXEKjBBJzAR+L+TGQAQ+MAKjBBBB9geHQjBBJzAK+L+TGKAK+MARjBBBB9geHRKADC9+FAI87EBDNDNjBBBzjBBB+/AdjBBBB9geAdjBBJ+/AdjBBJ+/9geGdjBBJzAdjBBJz9feAWnmGd+LjBBB9P9dtMBAd+oHBXEKCJJJJ94HBKADAB87EBDNDNjBBBzjBBB+/AQjBBBB9geAQjBBJ+/AQjBBJ+/9geGdjBBJzAdjBBJz9feAOnmGd+LjBBB9P9dtMBAd+oHBXEKCJJJJ94HBKADC98FAB87EBDNDNjBBBzjBBB+/ARjBBBB9geARjBBJ+/ARjBBJ+/9geGRjBBJzARjBBJz9feAOnmGR+LjBBB9P9dtMBAR+oHBXEKCJJJJ94HBKADC96FAB87EBALCZFHLADCWFHDAECUFGEMBXDKKABCIFHDINALCLFiDBGRjBBBBjBBJzALiDBGd+LAR+LmALCWFiDBGQ+LmGR+VARjBBBB9beGRnHKAdARnHRALCXFiDBHdDNDNAQjBBBB9gtMBAKHQXEKjBBJzAR+L+TGQAQ+MAKjBBBB9geHQjBBJzAK+L+TGKAK+MARjBBBB9geHRKADCUFAI86BBDNDNjBBBzjBBB+/AdjBBBB9geAdjBBJ+/AdjBBJ+/9geGdjBBJzAdjBBJz9feAWnmGd+LjBBB9P9dtMBAd+oHBXEKCJJJJ94HBKADAB86BBDNDNjBBBzjBBB+/AQjBBBB9geAQjBBJ+/AQjBBJ+/9geGdjBBJzAdjBBJz9feAOnmGd+LjBBB9P9dtMBAd+oHBXEKCJJJJ94HBKADC9+FAB86BBDNDNjBBBzjBBB+/ARjBBBB9geARjBBJ+/ARjBBJ+/9geGRjBBJzARjBBJz9feAOnmGR+LjBBB9P9dtMBAR+oHBXEKCJJJJ94HBKADC99FAB86BBALCZFHLADCLFHDAECUFGEMBKKK/KLLD99EUE99EUDNAEtMBDNDNCUAICUFTCU7+yGVjBBBzmGO+LjBBB9P9dtMBAO+oHIXEKCJJJJ94HIKAIC/8fIgHRINABCOFCICDALCLFiDB+LALiDB+L9eGIALCWFiDB+LALAICDTFiDB+L9eeGIALCXFiDB+LALAICDTFiDB+L9eeGIARv87EBDNDNjBBBzjBBB+/ALAICEFCIgCDTFiDBj/zL+1znjBBJ+/jBBJzALAICDTFiDBjBBBB9deGOnGWjBBBB9geAWjBBJ+/AWjBBJ+/9geGWjBBJzAWjBBJz9feAVnmGW+LjBBB9P9dtMBAW+oHdXEKCJJJJ94HdKABAd87EBDNDNjBBBzjBBB+/AOALAICDFCIgCDTFiDBj/zL+1znnGWjBBBB9geAWjBBJ+/AWjBBJ+/9geGWjBBJzAWjBBJz9feAVnmGW+LjBBB9P9dtMBAW+oHdXEKCJJJJ94HdKABCDFAd87EBDNDNjBBBzjBBB+/AOALAICUFCIgCDTFiDBj/zL+1znnGOjBBBB9geAOjBBJ+/AOjBBJ+/9geGOjBBJzAOjBBJz9feAVnmGO+LjBBB9P9dtMBAO+oHIXEKCJJJJ94HIKABCLFAI87EBABCWFHBALCZFHLAECUFGEMBKKK+tDDWUE998jJJJJBCZ9rGV8kJJJJBDNAEtMBADCD4GOtMBCEAI9rHRAOCDTHWCBHdINC+cUHDALHIAOHQINAIiDBAVCXFZ+YJJJB8aAVYDXGKADADAK9IeHDAICLFHIAQCUFGQMBKARADFGICkTHKCBHDCBAI9rHXAOHIINDNDNALADFiDBGMAXZ+XJJJBjBBBzjBBB+/AMjBBBB9gemGM+LjBBB9P9dtMBAM+oHQXEKCJJJJ94HQKABADFAQCfffRgAKvbDBADCLFHDAICUFGIMBKABAWFHBALAWFHLAdCEFGdAE9HMBKKAVCZF8kJJJJBK+iMDlUI998jJJJJBC+QD9rGV8kJJJJBAVC+oEFCBC/kBZnJJJB8aCBHODNADtMBCBHOAItMBDNABAE9HMBAVCUADCDTGRADCffffI0eCBYD/4+JJJBhJJJJBBGEbD+oEAVCEbD1DAEABARZ+TJJJB8aKAVC+YEFCWFCBbDBAV9CB83I+YEAVC+YEFAEADAIAVC+oEFZ+OJJJBCUAICDTGWAICffffI0eGdCBYD/4+JJJBhJJJJBBHRAVC+oEFAVYD1DGOCDTFARbDBAVAOCEFGQbD1DARAVYD+YEGKAWZ+TJJJBHXAVC+oEFAQCDTFADCI9uGMCBYD/4+JJJBhJJJJBBGRbDBAVAOCDFGWbD1DARCBAMZnJJJBHpAVC+oEFAWCDTFAdCBYD/4+JJJBhJJJJBBGSbDBAVAOCIFGQbD1DAXHRASHWINAWALiDBALARYDBGdCWAdCW6eCDTFC/EBFiDBmuDBARCLFHRAWCLFHWAICUFGIMBKCBHIAVC+oEFAQCDTFCUAMCDTADCffff970eCBYD/4+JJJBhJJJJBBGQbDBAVAOCLFGObD1DDNADCI6MBAEHRAQHWINAWASARYDBCDTFiDBASARCLFYDBCDTFiDBmASARCWFYDBCDTFiDBmuDBARCXFHRAWCLFHWAICEFGIAM6MBKKAVC/MBFHZAVYD+cEHhAVYD+gEHoAVHRCBHdCBHWCBHaCEHcINARHxAEAWCX2FGqCWFGlYDBHDAqYDBHkABAaCX2FGRCLFAqCLFGyYDBG8abDBARAkbDBARCWFADbDBApAWFCE86BBAZADbDWAZA8abDLAZAkbDBAQAWCDTFCBbDBCIHeDNAdtMBAxHRINDNARYDBGIADsMBAIAksMBAIA8asMBAZAeCDTFAIbDBAeCEFHeKARCLFHRAdCUFGdMBKKAXAkCDTFGRARYDBCUFbDBAXA8aCDTFGRARYDBCUFbDBAXADCDTFGRARYDBCUFbDBAoAhAqYDBCDTGIFYDBCDTFGkHRAKAIFGDYDBGdHIDNAdtMBDNINARYDBAWsMEARCLFHRAICUFGItMDXBKKARAdCDTAkFC98FYDBbDBADADYDBCUFbDBKAoAhAyYDBCDTGIFYDBCDTFGkHRAKAIFGDYDBGdHIDNAdtMBDNINARYDBAWsMEARCLFHRAICUFGIMBXDKKARAdCDTAkFC98FYDBbDBADADYDBCUFbDBKDNAKAlYDBCDTGRFGDYDBGdtMBAoAhARFYDBCDTFGkHRAdHIDNINARYDBAWsMEARCLFHRAICUFGIMBXDKKARAdCDTAkFC98FYDBbDBADADYDBCUFbDBKDNDNAetMBCUHWjBBBBH3CBHRINASAZARCDTFYDBCDTGIFGdiDBH5AdALCBARCEFGkARCS0eCDTFiDBALAXAIFYDBGRCWARCW6eCDTFC/EBFiDBmG8euDBDNAKAIFYDBGdtMBA8eA5+TH8eAoAhAIFYDBCDTFHRAdCDTHIINAQARYDBGdCDTFGDA8eADiDBmG5uDBA5A3A3A59dGDeH3AdAWADeHWARCLFHRAIC98FGIMBKKAkHRAkAe9HMBKAWCU9HMEKAcAM9PMDINDNApAcFrBBMBAcHWXDKAMAcCEFGc9HMBXIKKAaCEFHaAeCZAeCZ6eHdAZHRAxHZAWCU9HMBKKAOCDTAVC+oEFFC98FHRDNINAOtMEARYDBCBYD/0+JJJBh+BJJJBBARC98FHRAOCUFHOXBKKAVC+QDF8kJJJJBK/iLEVUCUAICDTGVAICffffI0eGOCBYD/4+JJJBhJJJJBBHRALALYD9gGWCDTFARbDBALAWCEFbD9gABARbDBAOCBYD/4+JJJBhJJJJBBHRALALYD9gGOCDTFARbDBALAOCEFbD9gABARbDLCUADCDTADCffffI0eCBYD/4+JJJBhJJJJBBHRALALYD9gGOCDTFARbDBALAOCEFbD9gABARbDWABYDBCBAVZnJJJB8aADCI9uHdDNADtMBABYDBHOAEHLADHRINAOALYDBCDTFGVAVYDBCEFbDBALCLFHLARCUFGRMBKKDNAItMBABYDBHLABYDLHRCBHVAIHOINARAVbDBARCLFHRALYDBAVFHVALCLFHLAOCUFGOMBKKDNADCI6MBABYDLHRABYDWHVCBHLINAECWFYDBHOAECLFYDBHDARAEYDBCDTFGWAWYDBGWCEFbDBAVAWCDTFALbDBARADCDTFGDADYDBGDCEFbDBAVADCDTFALbDBARAOCDTFGOAOYDBGOCEFbDBAVAOCDTFALbDBAECXFHEALCEFGLAd6MBKKDNAItMBABYDLHEABYDBHLINAEAEYDBALYDB9rbDBALCLFHLAECLFHEAICUFGIMBKKKqBABAEADAIC+k1JJBZ+NJJJBKqBABAEADAIC+M+JJJBZ+NJJJBK9dEEUABCfEAICDTZnJJJBHLCBHIDNADtMBINDNALAEYDBCDTFGBYDBCU9HMBABAIbDBAICEFHIKAECLFHEADCUFGDMBKKAIK9TEIUCBCBYD/8+JJJBGEABCIFC98gFGBbD/8+JJJBDNDNABzBCZTGD9NMBCUHIABAD9rCffIFCZ4NBCUsMEKAEHIKAIK/lEEEUDNDNAEABvCIgtMBABHIXEKDNDNADCZ9PMBABHIXEKABHIINAIAEYDBbDBAICLFAECLFYDBbDBAICWFAECWFYDBbDBAICXFAECXFYDBbDBAICZFHIAECZFHEADC9wFGDCS0MBKKADCL6MBINAIAEYDBbDBAECLFHEAICLFHIADC98FGDCI0MBKKDNADtMBINAIAErBB86BBAICEFHIAECEFHEADCUFGDMBKKABK/AEEDUDNDNABCIgtMBABHIXEKAECfEgC+B+C+EW2HLDNDNADCZ9PMBABHIXEKABHIINAIALbDBAICXFALbDBAICWFALbDBAICLFALbDBAICZFHIADC9wFGDCS0MBKKADCL6MBINAIALbDBAICLFHIADC98FGDCI0MBKKDNADtMBINAIAE86BBAICEFHIADCUFGDMBKKABK9TEIUCBCBYD/8+JJJBGEABCIFC98gFGBbD/8+JJJBDNDNABzBCZTGD9NMBCUHIABAD9rCffIFCZ4NBCUsMEKAEHIKAIK9+EIUzBHEDNDNCBYD/8+JJJBGDAECZTGI9NMBCUHEADAI9rCffIFCZ4NBCUsMEKADHEKCBABAE9rCIFC98gCBYD/8+JJJBFGDbD/8+JJJBDNADzBCZTGE9NMBADAE9rCffIFCZ4NB8aKKXBABAEZ+ZJJJBK+BEEIUDNAB+8GDCl4GICfEgGLCfEsMBDNALMBDNABjBBBB9cMBAECBbDBABSKABjBBJ9fnAEZ+YJJJBHBAEAEYDBCNFbDBABSKAEAICfEgC+CUFbDBADCfff+D94gCJJJ/4Iv++HBKABK+gEBDNDNAECJE9IMBABjBBBUnHBDNAECfE9OMBAEC+BUFHEXDKABjBBBUnHBAECPDAECPD9IeC+C9+FHEXEKAEC+BU9KMBABjBBJXnHBDNAEC+b9+9MMBAEC/mBFHEXEKABjBBJXnHBAEC+299AEC+2999KeC/MEFHEKABAEClTCJJJ/8IF++nKK+ODDBCJWK/0EBBBBEBBBDBBBEBBBDBBBBBBBDBBBBBBBEBBBBBBB+L29Hz/69+9Kz/n/76z/RG97z/Z/O9Xz8j/b85z/+/U9Yz/B/K9hz+2/z9dz9E+L9Mz59a8kz+R/t3z+a+Zyz79ohz/J4++8++y+d9v8+BBBB9S+49+z8r+Hbz9m9m/m8+l/Z/O8+/8+pg89Q/X+j878r+Hq8++m+b/E87BBBBBBJzBBJzBBJz+e/v/n8++y+dSz9I/h/68+XD/r8+/H0838+/w+nOzBBBB+wv9o8+UF888+9I/h/68+9C9g/l89/N/M9M89/d8kO8+BBBBF+8Tz9M836zs+2azl/Zpzz818ez9E+LXz/u98f8+819e/68+BC/0dKXEBBBDBBBZwBB";

	// Used to unpack wasm
	var wasmpack = new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);

	if (typeof WebAssembly !== 'object') {
		// This module requires WebAssembly to function
		return {
			supported: false,
		};
	}

	var instance;

	var promise =
		WebAssembly.instantiate(unpack(wasm), {})
		.then(function(result) {
			instance = result.instance;
			instance.exports.__wasm_call_ctors();
			instance.exports.meshopt_encodeVertexVersion(0);
			instance.exports.meshopt_encodeIndexVersion(1);
		});

	function unpack(data) {
		var result = new Uint8Array(data.length);
		for (var i = 0; i < data.length; ++i) {
			var ch = data.charCodeAt(i);
			result[i] = ch > 96 ? ch - 71 : ch > 64 ? ch - 65 : ch > 47 ? ch + 4 : ch > 46 ? 63 : 62;
		}
		var write = 0;
		for (var i = 0; i < data.length; ++i) {
			result[write++] = (result[i] < 60) ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
		}
		return result.buffer.slice(0, write);
	}

	function encode(fun, bound, source, count, size) {
		var sbrk = instance.exports.sbrk;
		var tp = sbrk(bound);
		var sp = sbrk(count * size);
		var heap = new Uint8Array(instance.exports.memory.buffer);
		heap.set(new Uint8Array(source.buffer, source.byteOffset, source.byteLength), sp);
		var res = fun(tp, bound, sp, count, size);
		var target = new Uint8Array(res);
		target.set(heap.subarray(tp, tp + res));
		sbrk(tp - sbrk(0));
		return target;
	}

	function maxindex(source) {
		var result = 0;
		for (var i = 0; i < source.length; ++i) {
			var index = source[i];
			result = result < index ? index : result;
		}
		return result;
	}

	function index32(source) {
		if (source instanceof Uint32Array || source instanceof Int32Array) {
			return source;
		}
		var result = new Uint32Array(source.length);
		for (var i = 0; i < source.length; ++i) {
			result[i] = source[i];
		}
		return result;
	}

	function filter(fun, source, count, stride, bits, insize) {
		var sbrk = instance.exports.sbrk;
		var tp = sbrk(count * stride);
		var sp = sbrk(count * insize);
		var heap = new Uint8Array(instance.exports.memory.buffer);
		heap.set(new Uint8Array(source.buffer, source.byteOffset, source.byteLength), sp);
		fun(tp, count, stride, bits, sp);
		var target = new Uint8Array(count * stride);
		target.set(heap.subarray(tp, tp + count * stride));
		sbrk(tp - sbrk(0));
		return target;
	}

	return {
		ready: promise,
		supported: true,
		encodeVertexBuffer: function(source, count, size) {
			var bound = instance.exports.meshopt_encodeVertexBufferBound(count, size);
			return encode(instance.exports.meshopt_encodeVertexBuffer, bound, source, count, size);
		},
		encodeIndexBuffer: function(source, count) {
			var bound = instance.exports.meshopt_encodeIndexBufferBound(count, maxindex(source) + 1);
			return encode(instance.exports.meshopt_encodeIndexBuffer, bound, index32(source), count, 4);
		},
		encodeIndexSequence: function(source, count) {
			var bound = instance.exports.meshopt_encodeIndexSequenceBound(count, maxindex(source) + 1);
			return encode(instance.exports.meshopt_encodeIndexSequence, bound, index32(source), count, 4);
		},
		encodeFilterOct: function(source, count, stride, bits) {
			return filter(instance.exports.meshopt_encodeFilterOct, source, count, stride, bits, 4);
		},
		encodeFilterQuat: function(source, count, stride, bits) {
			return filter(instance.exports.meshopt_encodeFilterQuat, source, count, stride, bits, 4);
		},
		encodeFilterExp: function(source, count, stride, bits) {
			return filter(instance.exports.meshopt_encodeFilterExp, source, count, stride, bits, stride/4);
		},
	};
})();

// UMD-style export for MeshoptEncoder
if (typeof exports === 'object' && typeof module === 'object')
	module.exports = MeshoptEncoder;
else if (typeof define === 'function' && define['amd'])
	define([], function() {
		return MeshoptEncoder;
	});
else if (typeof exports === 'object')
	exports["MeshoptEncoder"] = MeshoptEncoder;
else
	(typeof self !== 'undefined' ? self : this).MeshoptEncoder = MeshoptEncoder;
