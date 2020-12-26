@objc(SaveBase64Image)
class SaveBase64Image: NSObject {
    
    var resolver: RCTPromiseResolveBlock?
    var rejecter: RCTPromiseRejectBlock?
    
    @objc(save:withOptions:withResolver:withRejecter:)
    func save(
        base64ImageString: String,
        options: Dictionary<String, Any>,
        resolve:  @escaping RCTPromiseResolveBlock,
        reject:  @escaping RCTPromiseRejectBlock
    ) -> Void {
        guard let image = decodeBase64ToImage(encodedData: base64ImageString) else {
            return resolve(false)
        }
        
        self.resolver = resolve
        self.rejecter = reject
        
        UIImageWriteToSavedPhotosAlbum(image, self, #selector(self.image(_:didFinishSavingWithError:contextInfo:)), nil)
    }
    
    @objc(share:withOptions:withResolver:withRejecter:)
    func share(
        base64ImageString: String,
        options: Dictionary<String, Any>,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) -> Void {
        guard let image = decodeBase64ToImage(encodedData: base64ImageString) else {
            return resolve(false)
        }
        
        guard let currentViewController = RCTPresentedViewController() else {
            return resolve(false)
        }

        let activityViewController = UIActivityViewController(activityItems: [image], applicationActivities: nil)
        DispatchQueue.main.async {
            currentViewController.present(activityViewController, animated: true) {
                resolve(true)
            }
        }
    }
    
    @objc(image:didFinishSavingWithError:contextInfo:)
    func image(_ image: UIImage, didFinishSavingWithError error: NSError?, contextInfo: UnsafeRawPointer) {
        guard error == nil else {
            // Error saving image
            resolver?(false)
            return
        }

        // Image saved successfully
        resolver?(true)
    }
    
}

func decodeBase64ToImage(encodedData: String) -> UIImage? {
    guard let data = Data.init(base64Encoded: encodedData) else {
        return nil
    }
    return UIImage(data: data)
}


