import Image from "next/image"
import Link from "next/link"

const Footer =()=>{
    return(
        <>
        <div className="flex justify-center items-center gap-2">
         
            <Image 
            src="/saeda-profile.jpg"
            alt="Description of the image"
            width={50} 
            height={50} 
            className="w-12 h-12 rounded-full object-cover" 
          />
        
            <p className="font-normal">created by <Link href="mailto:saedaraed19@gmail.com">Saeda Mughari</Link></p>
        </div>
        </>
    )
 
}

export default Footer;