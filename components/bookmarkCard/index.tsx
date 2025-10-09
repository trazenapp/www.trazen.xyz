import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Link, Edit, Trash2 } from 'lucide-react'
import router from 'next/router'
import React from 'react'
import { Button } from 'react-day-picker'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { MdMoreHoriz } from 'react-icons/md'
import { PiArrowFatUp, PiArrowFatDown, PiBookmarkSimpleBold } from 'react-icons/pi'
import { TbShare3 } from 'react-icons/tb'
import AvatarProfile from '../avatarProfile'
import Card from '../card'
import FeedsComment from '../feedsComment'
import FeedsMedia from '../feedsMedia'

const BookmarkCard = () => {
  return (
    <Card className="md:!px-[23px] md:!py-5 !p-3 flex flex-col gap-y-5 !rounded-[16px] !border-0 mb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-x-2.5 font-sans">
            <Link href="/profile" className="flex items-start gap-x-2.5">
              {/* <AvatarProfile
                createdAt={createdAt}
                name={name}
                avatar={avatar}
                is_approved={is_approved}
              /> */}
            </Link>
            {/* <Button className="!py-1 !px-2.5 border !border-[#DDDDDD] !text-[#DDDDDD] rounded-full text-[10px]">
              Follow
            </Button> */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="!w-fit !h-fit p-0">
                <MdMoreHoriz size={36} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#272727] !min-w-0 !p-0 border-0 w-32"
              align="end"
            >
              <DropdownMenuItem className="text-[#ddd] font-sans font-normal text-xs !w-full flex items-center gap-x-2.5 py-2.5 px-3">
                <Edit /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#ddd] font-sans font-normal text-xs !w-full flex items-center gap-x-2.5 py-2.5 px-3">
                <Trash2 color="red" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p
          onClick={() => handlePageClick(uuid)}
          className="cursor-pointer text-[#F4F4F4F4] text-sm lg:text-base font-normal font-sans line-clamp-2"
        >
          {/* {content} */}
        </p>
        <div className="overflow-hidden rounded-[12px] w-full">
          {/* <FeedsMedia media={medias} maxVisible={4} /> */}
        </div>
        <div
          className="flex justify-between gap-x-2.5 overflow-x-scroll md:overflow-x-hidden"
          style={{ scrollbarWidth: "none" }}
        >
          <Button 
            // onClick={() => handleVote("UPVOTE", uuid)} 
            className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm">
            <PiArrowFatUp />
            {/* {upvoteCount} */}
          </Button>
          <Button 
            // onClick={() => handleVote("DOWNVOTE", uuid)} 
            className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm">
            <PiArrowFatDown />
            {/* {downvoteCount} */}
          </Button>
          <Button 
            // onClick={() => router.push(`/home/${uuid}`)} 
            className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm">
            <IoChatbubbleOutline />
            {/* {commentCount} */}
          </Button>
          <Button className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm">
            <TbShare3 />
            0
          </Button>
          <Button 
            // onClick={() => handleBookmark(uuid)} 
            className={`!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm`}>
            <PiBookmarkSimpleBold />
            0
          </Button>
        </div>
        {/* <FeedsComment uuid={uuid} isComment={false} /> */}
      </Card> 
  )
}

export default BookmarkCard